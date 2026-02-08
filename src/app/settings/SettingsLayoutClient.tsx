/**
 * @file /settings/SettingsLayoutClient.tsx
 * @description Client wrapper to share Settings state across dashboard + modal routes
 */

"use client";

import type { ReactNode } from "react";
import { SettingsProvider } from "./_components/SettingsContext";

export default function SettingsLayoutClient({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <SettingsProvider>
      {children}
      {modal}
    </SettingsProvider>
  );
}
