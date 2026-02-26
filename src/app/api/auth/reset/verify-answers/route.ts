import { NextResponse } from "next/server";
import { mockDb, hashAnswer } from "@/mocks/auth";

type Payload = {
  token?: string;
  answers?: Array<{ questionId: string; answer: string }>;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;

  const token = body?.token?.toString() ?? "";
  const rr = token ? mockDb.resetRequests.get(token) : undefined;

  if (!rr) {
    return NextResponse.json(
      { ok: false, code: "INVALID_TOKEN" },
      { status: 400 },
    );
  }

  if (Date.now() > rr.expiresAt) {
    mockDb.resetRequests.delete(token);
    return NextResponse.json(
      { ok: false, code: "TOKEN_EXPIRED" },
      { status: 400 },
    );
  }

  if (rr.attempts >= 5) {
    mockDb.resetRequests.delete(token);
    return NextResponse.json(
      { ok: false, code: "TOO_MANY_ATTEMPTS" },
      { status: 429 },
    );
  }

  const user = [...mockDb.users.values()].find((u) => u.id === rr.userId);

  if (!user) {
    mockDb.resetRequests.delete(token);
    return NextResponse.json(
      { ok: false, code: "INVALID_TOKEN" },
      { status: 400 },
    );
  }

  const requiredIds = rr.askedQuestionIds;
  const provided = new Map(
    (body?.answers ?? []).map((a) => [a.questionId, a.answer]),
  );

  const allCorrect = requiredIds.every((qid) => {
    const question = user.securityQuestions.find((q) => q.id === qid);
    if (!question) return false;
    const raw = provided.get(qid) ?? "";
    return hashAnswer(raw) === question.answerHash;
  });

  if (!allCorrect) {
    rr.attempts += 1;
    return NextResponse.json(
      { ok: false, code: "VERIFICATION_FAILED" },
      { status: 400 },
    );
  }

  rr.verified = true;

  return NextResponse.json({ ok: true });
}
