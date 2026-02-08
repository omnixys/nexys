import { USER_TYPE_I18N } from "../../types/user/enum-translations";
import { UserType } from "../../types/user/user-enum-type";
import { formatEnum } from "../format-enum";

export function formatUserType(v?: UserType | null, tUser?: any): string {
  if (!v) return "—";
  if (tUser) return formatEnum(tUser, USER_TYPE_I18N, v);
  return String(v);
}