import { UserType } from "@/generated/graphql";
import { formatEnum } from "@/i18n/format-enum";


export function formatUserType<T extends (key: any) => string>(
  type: UserType | null | undefined,
  t: T,
) {
  return formatEnum(t, "userType", type);
}