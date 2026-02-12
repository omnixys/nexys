/**
 * @file /security/SecurityLayoutClient.tsx
 * @description Client wrapper to share Security state across dashboard + modal routes
 */

"use client";

import type { ReactNode } from "react";
import { SecurityProvider } from "@/components/security/SecurityContext";

export default function SecurityLayoutClient({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <SecurityProvider>
      {children}
      {modal}
    </SecurityProvider>
  );
}
