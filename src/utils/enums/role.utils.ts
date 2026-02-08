import { KcRole } from "../types/authentication/auth-enum.type";

export function tierLevelToRole(level: number): KcRole {
  // 1 = BASIC, 2 = ELITE, 3 = SUPREME
  if (level >= 3) return KcRole.SUPREME;
  if (level === 2) return KcRole.ELITE;
  return KcRole.BASIC;
}

export function roleToTierLabel(role: KcRole): string {
  switch (role) {
    case KcRole.SUPREME:
      return "Supreme";
    case KcRole.ELITE:
      return "Elite";
    case KcRole.BASIC:
      return "Basic";
    default:
      return "—";
  }
}
