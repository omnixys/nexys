/**
 * @file SettingsNavigation.tsx
 * @description Luxury settings navigation with glassmorphism
 */

"use client";

import {
  AccountCircle as AccountIcon,
  SettingsApplications as AdvancedIcon,
  Analytics as AnalyticsIcon,
  Backup as BackupIcon,
  Receipt as BillingIcon,
  CreditCard as CardIcon,
  ChildCare as ChildCareIcon,
  CloudDownload as CloudDownloadIcon,
  Cloud as CloudIcon,
  Dashboard as DashboardIcon,
  Devices as DevicesIcon,
  Smartphone as DigitalIcon,
  FamilyRestroom as FamilyIcon,
  FamilyRestroom as FamilyRestroomIcon,
  History as HistoryIcon,
  Language as LanguageIcon,
  Lock as LockIcon,
  Notifications as NotificationIcon,
  Notifications as NotificationsIcon,
  Payments as PaymentsIcon,
  Speed as PerformanceIcon,
  PersonAdd as PersonAddIcon,
  Security as SecurityIcon,
  Smartphone as SmartphoneIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Palette as ThemeIcon,
} from "@mui/icons-material";

import {
  alpha,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import { CreditCardIcon, PaletteIcon, ReceiptIcon } from "lucide-react";

const settingsSections = [
  {
    title: "Security & Privacy",
    icon: <SecurityIcon />,
    badge: "Critical",
    color: "#FF5252",
    items: [
      {
        label: "Two-Factor Authentication",
        icon: <LockIcon />,
        path: "/settings/security/2fa",
      },
      {
        label: "Login Activity",
        icon: <AnalyticsIcon />,
        path: "/settings/security/login-activity",
      },
      {
        label: "Biometric Access",
        icon: <SecurityIcon />,
        path: "/settings/security/biometric",
      },
      {
        label: "Privacy Controls",
        icon: <LockIcon />,
        path: "/settings/security/privacy",
      },
      {
        label: "Emergency Access",
        icon: <SecurityIcon />,
        path: "/settings/security/emergency",
      },
    ],
  },
  {
    title: "Account",
    icon: <AccountIcon />,
    badge: "Complete",
    color: "#2196F3",
    items: [
      {
        label: "Profile Information",
        icon: <AccountIcon />,
        path: "/settings/account/profile",
      },
      {
        label: "Communication",
        icon: <NotificationIcon />,
        path: "/settings/account/communication",
      },
      {
        label: "Language & Region",
        icon: <LanguageIcon />,
        path: "/settings/account/language",
      },
      {
        label: "Documents",
        icon: <ReceiptIcon />,
        path: "/settings/account/documents",
      },
    ],
  },
  {
    title: "Financial Settings",
    icon: <PaymentsIcon />,
    color: "#4CAF50",
    items: [
      {
        label: "Transaction Limits",
        icon: <PaymentsIcon />,
        path: "/settings/financial/limits",
      },
      {
        label: "Payment Methods",
        icon: <CreditCardIcon />,
        path: "/settings/financial/payments",
      },
      {
        label: "Auto-Pay Rules",
        icon: <PaymentsIcon />,
        path: "/settings/financial/autopay",
      },
      {
        label: "Investment Profile",
        icon: <AnalyticsIcon />,
        path: "/settings/financial/investment",
      },
    ],
  },
  {
    title: "Digital Experience",
    icon: <DigitalIcon />,
    color: "#9C27B0",
    items: [
      {
        label: "Theme & Appearance",
        icon: <PaletteIcon />,
        path: "/settings/digital/theme",
      },
      {
        label: "Dashboard Layout",
        icon: <DashboardIcon />,
        path: "/settings/digital/dashboard",
      },
      {
        label: "Quick Actions",
        icon: <SpeedIcon />,
        path: "/settings/digital/quick-actions",
      },
      {
        label: "Notifications",
        icon: <NotificationsIcon />,
        path: "/settings/digital/notifications",
      },
    ],
  },
  {
    title: "Cards & Devices",
    icon: <CardIcon />,
    color: "#FF9800",
    items: [
      {
        label: "Card Management",
        icon: <CreditCardIcon />,
        path: "/settings/cards/manage",
      },
      {
        label: "Digital Wallets",
        icon: <SmartphoneIcon />,
        path: "/settings/cards/wallets",
      },
      {
        label: "Trusted Devices",
        icon: <DevicesIcon />,
        path: "/settings/cards/devices",
      },
    ],
  },
  {
    title: "Data Management",
    icon: <BackupIcon />,
    color: "#00BCD4",
    items: [
      {
        label: "Data Export",
        icon: <CloudDownloadIcon />,
        path: "/settings/data/export",
      },
      {
        label: "Backup Settings",
        icon: <BackupIcon />,
        path: "/settings/data/backup",
      },
      {
        label: "Data Retention",
        icon: <StorageIcon />,
        path: "/settings/data/retention",
      },
    ],
  },
  {
    title: "Family & Sharing",
    icon: <FamilyIcon />,
    color: "#E91E63",
    items: [
      {
        label: "Family Accounts",
        icon: <FamilyRestroomIcon />,
        path: "/settings/family/accounts",
      },
      {
        label: "Shared Access",
        icon: <PersonAddIcon />,
        path: "/settings/family/sharing",
      },
      {
        label: "Child Controls",
        icon: <ChildCareIcon />,
        path: "/settings/family/child",
      },
    ],
  },
  {
    title: "Subscription",
    icon: <BillingIcon />,
    color: "#673AB7",
    items: [
      {
        label: "Current Plan",
        icon: <ReceiptIcon />,
        path: "/settings/billing/plan",
      },
      {
        label: "Payment History",
        icon: <HistoryIcon />,
        path: "/settings/billing/history",
      },
      {
        label: "Billing Information",
        icon: <BillingIcon />,
        path: "/settings/billing/info",
      },
    ],
  },
];
