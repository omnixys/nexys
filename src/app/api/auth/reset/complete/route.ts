import { NextResponse } from "next/server";
import { mockDb, hashPassword } from "@/mocks/auth";

type Payload = {
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
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

  if (!rr.verified) {
    return NextResponse.json(
      { ok: false, code: "VERIFICATION_REQUIRED" },
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

  const newPassword = body?.newPassword ?? "";
  const confirmPassword = body?.confirmPassword ?? "";

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { ok: false, code: "WEAK_PASSWORD" },
      { status: 400 },
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { ok: false, code: "PASSWORD_MISMATCH" },
      { status: 400 },
    );
  }

  user.passwordHash = hashPassword(newPassword);

  mockDb.resetRequests.delete(token);

  return NextResponse.json({ ok: true });
}
