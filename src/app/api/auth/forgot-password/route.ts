// /app/api/auth/forgot-password/route.ts

import { NextResponse } from "next/server";
import {
  createResetToken,
  findUserByEmail,
  mockDb,
  pickRandom,
} from "@/mocks/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    email?: string;
  } | null;
  const email = body?.email?.toString().trim().toLowerCase() ?? "";

  // Always return neutral success to prevent enumeration.
  const neutralResponse = NextResponse.json({ ok: true });

  // Only if user exists, create a reset request + "send email".
  const user = email ? findUserByEmail(email) : undefined;
  if (!user) return neutralResponse;

  const token = createResetToken();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 min

  const asked = pickRandom(user.securityQuestions, 2).map((q) => q.id);

  mockDb.resetRequests.set(token, {
    token,
    userId: user.id,
    expiresAt,
    verified: false,
    askedQuestionIds: asked,
    attempts: 0,
  });

  // Mock: print reset URL to server logs for testing.
  // In production: send email with this link.
  console.log(
    `[MOCK EMAIL] Reset link for ${email}: http://localhost:3000/reset-password?token=${token}`,
  );

  return neutralResponse;
}
