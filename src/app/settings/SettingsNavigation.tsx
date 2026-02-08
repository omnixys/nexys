/**
 * @file SettingsNavigation.tsx
 * @description Luxury settings navigation with glassmorphism
 */

"use client";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Divider,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Payments as PaymentsIcon,
  Smartphone as DigitalIcon,
  CreditCard as CardIcon,
  Devices as DevicesIcon,
  Backup as BackupIcon,
  SettingsApplications as AdvancedIcon,
  FamilyRestroom as FamilyIcon,
  Receipt as BillingIcon,
  Notifications as NotificationIcon,
  Language as LanguageIcon,
  Palette as ThemeIcon,
  Lock as LockIcon,
  Speed as PerformanceIcon,
  Cloud as CloudIcon,
  PersonAdd as PersonAddIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

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
