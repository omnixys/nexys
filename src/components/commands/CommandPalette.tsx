"use client";

import { JSX, useEffect, useState } from "react";
import { Command } from "cmdk";
import { Dialog } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { COMMANDS } from "./commands";

export default function CommandPalette(): JSX.Element {
  const router = useRouter();
  const t = useTranslations("command");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const groups = ["navigation", "workspace", "account"] as const;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <Command>
        <Command.Input placeholder={t("searchPlaceholder")} autoFocus />

        <Command.List>
          <Command.Empty>{t("empty")}</Command.Empty>

          {groups.map((group) => (
            <Command.Group key={group} heading={t(`groups.${group}`)}>
              {COMMANDS.filter((c) => c.group === group).map((cmd) => (
                <Command.Item
                  key={cmd.key}
                  onSelect={() => {
                    setOpen(false);

                    if (cmd.path) {
                      router.push(cmd.path);
                    }
                  }}
                >
                  {t(`commands.${cmd.key}`)}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </Dialog>
  );
}
