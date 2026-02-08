/**
 * @file /settings/_components/SettingsContext.tsx
 * @description Shared settings state for dashboard tiles and modal panels
 */

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SettingsState = {
  darkMode: boolean;
  fontSize: number;
  language: string;
  currency: string;
  autoBackup: boolean;
  familySharing: boolean;
};

type SettingsContextValue = {
  state: SettingsState;
  setState: (patch: Partial<SettingsState>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const STORAGE_KEY = "omnixys.settings.v1";

const defaultState: SettingsState = {
  darkMode: true,
  fontSize: 16,
  language: "en",
  currency: "EUR",
  autoBackup: true,
  familySharing: false,
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, _setState] = useState<SettingsState>(defaultState);

  useEffect(() => {
    // Load persisted state (best-effort)
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SettingsState>;
      _setState((prev) => ({ ...prev, ...parsed }));
    } catch {
      // Ignore invalid storage
    }
  }, []);

  useEffect(() => {
    // Persist state (best-effort)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      state,
      setState: (patch) => _setState((prev) => ({ ...prev, ...patch })),
    }),
    [state],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
