/**
 * @file format-enum.ts
 * @description Strict enum formatter compatible with typed translators
 */

import { useTypedTranslations } from "../i18n/useTypedTranslations";
import { USER_ROLE_I18N, USER_STATUS_I18N, USER_TYPE_I18N } from "../types/user/enum-translations";
import { UserRole, UserStatusType, UserType } from "../types/user/user-enum-type";

export function formatEnum2<
  TEnum extends string,
  TKey extends string,
  TMap extends Record<TEnum, TKey>,
>(
  t: <K extends TKey>(key: K, values?: Record<string, any>) => string,
  map: TMap,
  value: TEnum,
): string {
  return t(map[value]);
}


// utils/formatEnum.ts
export function formatEnum(
  t: (key: string) => string,
  map: Record<string, string>,
  value?: string
) {
  if (!value) return "—";
  return t(map[value] ?? value);
}

/**
 * @description Enum label helper for strictly typed translators
 */
export function useEnumLabel<
  TEnum extends any,
  TKey extends string,
  TMap extends Record<TEnum, TKey>
>(
  t: {
    <K extends TKey>(key: K, values?: Record<string, any>): string;
  },
  map: TMap
) {
  return (value: TEnum) => t(map[value]);
}


