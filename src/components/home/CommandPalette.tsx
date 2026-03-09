/**
 * @file CommandPalette.tsx
 */

"use client";

import { Dialog, List, ListItem, ListItemText } from "@mui/material";
import { type JSX, useEffect, useState } from "react";

const COMMANDS = ["Open Inbox", "Go to Calendar", "Open Products", "Account Settings"];

export default function CommandPalette(): JSX.Element {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <List>
        {COMMANDS.map((c) => (
          <ListItem key={c}>
            <ListItemText primary={c} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
