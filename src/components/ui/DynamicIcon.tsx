"use client";

import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { HelpCircle } from "lucide-react";
import { memo } from "react";

/**
 * Extract only valid Lucide React components.
 */
type LucideIconComponent = React.ComponentType<LucideProps>;

const iconMap = LucideIcons as unknown as Record<string, LucideIconComponent>;

interface DynamicIconProps extends Omit<LucideProps, "name"> {
  name?: string | null;
  fallback?: string;
  normalize?: boolean;
}

/**
 * DynamicIcon
 *
 * Dynamically renders a Lucide icon by name.
 */
function DynamicIconComponent({
  name,
  fallback = "HelpCircle",
  normalize = true,
  ...props
}: DynamicIconProps) {
  if (!name) {
    return <HelpCircle {...props} />;
  }

  const formatted = normalize
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : name;

  const Icon = iconMap[formatted] ?? iconMap[fallback] ?? HelpCircle;

  return <Icon {...props} />;
}

export const DynamicIcon = memo(DynamicIconComponent);
