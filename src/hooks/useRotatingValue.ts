import React from "react";

export function useRotatingValue<T>(list: T[], intervalMs: number): T | null {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (!list || list.length === 0) return;

    setIdx(0);
    const id = window.setInterval(() => {
      setIdx((p) => (p + 1) % list.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, list?.length]);

  if (!list || list.length === 0) return null;
  return list[idx] ?? null;
}
