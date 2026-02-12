/**
 * @file SidebarGroup.tsx
 * @description Sidebar group with collapsible nested links
 */

"use client";

import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ChildLink = {
  href: string;
  label: string;
};

export default function SidebarGroup({
  href,
  label,
  childrenLinks,
  defaultExpanded,
  disabled,
  sx,
}: {
  href: string;
  label: string;
  childrenLinks: ChildLink[];
  defaultExpanded?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isActiveGroup = useMemo(() => {
    // Active when user is on group root or any sub route
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname, href]);

  const [open, setOpen] = useState<boolean>(defaultExpanded ?? false);

  useEffect(() => {
    // Auto-expand when route is inside this group
    if (isActiveGroup) setOpen(true);
  }, [isActiveGroup]);

  return (
    <List disablePadding sx={{}}>
      <ListItemButton
        disabled={disabled}
        onClick={() => {
          // UX choice: click on label navigates to group root, chevron toggles.
          router.push(href);
          setOpen(true);
        }}
        sx={{
          ...sx,
          mb: 0.5,
          "&:hover": { bgcolor: theme.palette.action.hover },
        }}
      >
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontWeight: isActiveGroup ? 800 : 600,
            color: isActiveGroup
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
          }}
        />

        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          style={{ display: "inline-flex", alignItems: "center" }}
          aria-label={open ? "Collapse" : "Expand"}
        >
          {open ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </span>
      </ListItemButton>

      <Collapse in={open} timeout={220} unmountOnExit>
        <List disablePadding sx={{ pl: 2, pb: 0.75 }}>
          {childrenLinks.map((c) => {
            const isActive = pathname === c.href;

            return (
              <ListItemButton
                key={c.href}
                onClick={() => router.push(c.href)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.25,
                  py: 0.75,
                  bgcolor: isActive
                    ? theme.palette.action.selected
                    : "transparent",
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                <ListItemText
                  primary={c.label}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
