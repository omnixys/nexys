/**
 * @file /security/_components/SecurityContext.tsx
 * @description Shared security state for dashboard tiles and modal panels
 */

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SecurityFeature = {
  id: string;
  name: string;
  enabled: boolean;
  priority: "high" | "medium" | "low";
};

export type DeviceItem = {
  id: number;
  name: string;
  type: string;
  location: string;
  active: boolean;
  lastActive: string;
};

export type LoginItem = {
  id: number;
  time: string;
  device: string;
  location: string;
  status: "success" | "blocked";
};

export type SecurityState = {
  securityScore: number;
  features: SecurityFeature[];
  devices: DeviceItem[];
  loginHistory: LoginItem[];
};

type SecurityContextValue = {
  state: SecurityState;
  setState: (patch: Partial<SecurityState>) => void;
  setFeatureEnabled: (id: string, enabled: boolean) => void;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

const STORAGE_KEY = "omnixys.security.v1";

const defaultState: SecurityState = {
  securityScore: 94,
  features: [
    { id: "2fa", name: "Two-Factor Auth", enabled: true, priority: "high" },
    {
      id: "biometric",
      name: "Biometric Login",
      enabled: true,
      priority: "high",
    },
    {
      id: "password",
      name: "Strong Password",
      enabled: true,
      priority: "high",
    },
    {
      id: "session",
      name: "Session Timeout",
      enabled: false,
      priority: "medium",
    },
    {
      id: "location",
      name: "Location Alerts",
      enabled: true,
      priority: "medium",
    },
    { id: "device", name: "Device Approval", enabled: false, priority: "low" },
  ],
  devices: [
    {
      id: 1,
      name: "iPhone 14 Pro",
      type: "Mobile",
      location: "Berlin, DE",
      active: true,
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "Laptop",
      location: "Berlin, DE",
      active: false,
      lastActive: "5 hours ago",
    },
    {
      id: 3,
      name: "iPad Air",
      type: "Tablet",
      location: "Hamburg, DE",
      active: true,
      lastActive: "15 min ago",
    },
    {
      id: 4,
      name: "Windows PC",
      type: "Desktop",
      location: "Munich, DE",
      active: false,
      lastActive: "3 days ago",
    },
  ],
  loginHistory: [
    {
      id: 1,
      time: "10:30 AM",
      device: "iPhone 14 Pro",
      location: "Berlin, DE",
      status: "success",
    },
    {
      id: 2,
      time: "09:15 AM",
      device: "MacBook Pro",
      location: "Berlin, DE",
      status: "success",
    },
    {
      id: 3,
      time: "02:45 AM",
      device: "Unknown",
      location: "New York, US",
      status: "blocked",
    },
    {
      id: 4,
      time: "Yesterday",
      device: "iPad Air",
      location: "Hamburg, DE",
      status: "success",
    },
    {
      id: 5,
      time: "2 days ago",
      device: "Windows PC",
      location: "Munich, DE",
      status: "success",
    },
  ],
};

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [state, _setState] = useState<SecurityState>(defaultState);

  useEffect(() => {
    // Load persisted state (best-effort)
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SecurityState>;
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

  const value = useMemo<SecurityContextValue>(() => {
    return {
      state,
      setState: (patch) => _setState((prev) => ({ ...prev, ...patch })),
      setFeatureEnabled: (id, enabled) =>
        _setState((prev) => ({
          ...prev,
          features: prev.features.map((f) =>
            f.id === id ? { ...f, enabled } : f,
          ),
        })),
    };
  }, [state]);

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const ctx = useContext(SecurityContext);
  if (!ctx) throw new Error("useSecurity must be used within SecurityProvider");
  return ctx;
}
