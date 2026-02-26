// /lib/auth/mockDb.ts

import crypto from "crypto";

type SecurityQuestion = {
  id: string;
  question: string;
  // Store hashed answer (never plain text in real systems)
  answerHash: string;
};

type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  securityQuestions: SecurityQuestion[];
};

type ResetRequest = {
  token: string;
  userId: string;
  expiresAt: number;
  verified: boolean;
  askedQuestionIds: string[];
  attempts: number;
};

function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/** Normalize user-provided answers before hashing (trim + lower + collapse spaces). */
export function normalizeAnswer(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ").normalize("NFKC");
}

export function hashAnswer(input: string): string {
  return sha256(normalizeAnswer(input));
}

export function hashPassword(input: string): string {
  // Mock hash only. Use Argon2id/bcrypt in production.
  return sha256(input);
}

/** In-memory "database". */
export const mockDb = {
  users: new Map<string, UserRecord>(),
  resetRequests: new Map<string, ResetRequest>(),
};

/** Seed one test user. */
(function seed() {
  const userId = "user_1";

  const user: UserRecord = {
    id: userId,
    email: "caleb@test.com",
    passwordHash: hashPassword("OldPassword123!"),
    securityQuestions: [
      {
        id: "q1",
        question: "What is the name of your first school?",
        answerHash: hashAnswer("Greenwood"),
      },
      {
        id: "q2",
        question: "What city were you born in?",
        answerHash: hashAnswer("Accra"),
      },
      {
        id: "q3",
        question: "What is your favorite meal?",
        answerHash: hashAnswer("Jollof rice"),
      },
    ],
  };

  mockDb.users.set(user.email, user);
})();

export function findUserByEmail(email: string): UserRecord | undefined {
  return mockDb.users.get(email.toLowerCase().trim());
}

export function createResetToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
