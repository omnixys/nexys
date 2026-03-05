"use client";

import { useTypedTranslations } from "./useTypedTranslations";

export function useEnumTranslations() {
  const t = useTypedTranslations("enums");

  return function translateEnum<T extends Record<string, string>>(
    enumName: keyof typeof t,
    value: string,
  ) {
    return t(`${enumName}.${value}` as any);
  };
}
