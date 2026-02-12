"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ABOUT_ROUTES } from "./aboutRoutes";

const SCROLL_THRESHOLD = 3020; // 2–3 Wheel-Events
const COOLDOWN_MS = 900;

export function useScrollPageNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const accumulated = useRef(0);
  const locked = useRef(false);
  const cooldownTimeout = useRef<NodeJS.Timeout | null>(null);

  const [overlayTitle, setOverlayTitle] = useState<string | null>(null);

  useEffect(() => {
    accumulated.current = 0;
    locked.current = false;

    const onWheel = (e: WheelEvent) => {
      if (locked.current) return;

      accumulated.current += e.deltaY;

      if (Math.abs(accumulated.current) < SCROLL_THRESHOLD) return;

      const direction = accumulated.current > 0 ? "down" : "up";
      accumulated.current = 0;

      const index = ABOUT_ROUTES.indexOf(pathname);
      if (index === -1) return;

      const nextIndex = direction === "down" ? index + 1 : index - 1;

      if (nextIndex < 0 || nextIndex >= ABOUT_ROUTES.length) return;

      // 🔒 Lock + Cooldown starten
      locked.current = true;
      triggerTransition(ABOUT_ROUTES[nextIndex]);
    };

    const triggerTransition = (href: string) => {
      const label = href.split("/").pop()?.replace("-", " ") ?? "Überblick";

      setOverlayTitle(label);

      // ⏳ Overlay anzeigen
      setTimeout(() => {
        router.push(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setOverlayTitle(null);
      }, 600);

      // ⏱ Cooldown erzwingen
      if (cooldownTimeout.current) {
        clearTimeout(cooldownTimeout.current);
      }

      cooldownTimeout.current = setTimeout(() => {
        locked.current = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (cooldownTimeout.current) {
        clearTimeout(cooldownTimeout.current);
      }
    };
  }, [pathname, router]);

  return { overlayTitle };
}
