import { NextResponse } from "next/server";
import { mockDb } from "@/mocks/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    token?: string;
  } | null;

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

  const user = [...mockDb.users.values()].find((u) => u.id === rr.userId);

  if (!user) {
    mockDb.resetRequests.delete(token);
    return NextResponse.json(
      { ok: false, code: "INVALID_TOKEN" },
      { status: 400 },
    );
  }

  const questions = user.securityQuestions
    .filter((q) => rr.askedQuestionIds.includes(q.id))
    .map((q) => ({
      id: q.id,
      question: q.question,
    }));

  return NextResponse.json({
    ok: true,
    questions,
    expiresAt: rr.expiresAt,
  });
}
