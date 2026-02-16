/**
 * @file date.ts
 * @description Date validation helpers (client-safe).
 */

export function isAtLeastAge(dateISO: string, minAgeYears: number): boolean {
  if (!dateISO) return false;

  const dob = new Date(dateISO);
  if (Number.isNaN(dob.getTime())) return false;

  const now = new Date();
  const cutoff = new Date(
    now.getFullYear() - minAgeYears,
    now.getMonth(),
    now.getDate(),
  );

  return dob <= cutoff;
}
