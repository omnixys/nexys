/**
 * Global command definitions for the command palette.
 */

export type CommandItem = {
  key: string;
  group?: string;
  path?: string;
};


export const COMMANDS: CommandItem[] = [
  { key: "home", group: "navigation", path: "/home" },
  { key: "inbox", group: "navigation", path: "/home/inbox" },
  { key: "calendar", group: "navigation", path: "/home/calendar" },
  { key: "products", group: "workspace", path: "/products" },
  { key: "accountSettings", group: "account", path: "/settings/account" },
  { key: "securitySettings", group: "account", path: "/settings/security" },
];


