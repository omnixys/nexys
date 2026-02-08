/**
 * @file /security/page.tsx
 * @description Security Center - Bento Grid Layout
 */

"use client";

import {
  Box,
  Container,
  Typography,
  Chip,
  IconButton,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DepthBlurLayer from "../../components/home/DepthBlurLayer";
import LayoutShell from "../../components/home/layout/LayoutShell";
import BentoTile from "../../components/home/BentoTile";
import { useAuth } from "../../providers/AuthProvider";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import DevicesIcon from "@mui/icons-material/Devices";
import HistoryIcon from "@mui/icons-material/History";
import WarningIcon from "@mui/icons-material/Warning";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =====================================================
   STAGGER CONFIG
===================================================== */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Mock data for security metrics
const securityData = [
  { month: "Jan", score: 75, threats: 3 },
  { month: "Feb", score: 82, threats: 2 },
  { month: "Mar", score: 88, threats: 1 },
  { month: "Apr", score: 85, threats: 2 },
  { month: "May", score: 91, threats: 0 },
  { month: "Jun", score: 94, threats: 0 },
];

const devices = [
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
];

const loginHistory = [
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
];

export default function SecurityPage() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [securityScore, setSecurityScore] = useState(94);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

  const securityFeatures = [
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
  ];

  return (
    <LayoutShell user={user} loading={loading}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: 4,
          py: 4,
        }}
      >
        <DepthBlurLayer active={focused !== null} />

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 1,
              background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Security Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage your account security
          </Typography>
        </Box>

        {/* ============================== */}
        {/* BENTO GRID LAYOUT              */}
        {/* ============================== */}
        <Box
          key={animationKey}
          component={motion.div}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "200px 300px 300px 250px",
            gap: 3,
            position: "relative",
            zIndex: 1300,
          }}
        >
          {/* ==================================== */}
          {/* SECURITY SCORE (Span 6)             */}
          {/* ==================================== */}
          <BentoTile
            index={0}
            area="1 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: 28, color: "#fff" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600 }}
                    >
                      SECURITY SCORE
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={800}
                      sx={{
                        background:
                          "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {securityScore}/100
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="Excellent"
                  color="success"
                  sx={{
                    bgcolor: alpha("#4CAF50", 0.2),
                    color: "#4CAF50",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                />
              </Box>

              {/* Score Chart */}
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#2196F3"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* SECURITY FEATURES (Span 6)          */}
          {/* ==================================== */}
          <BentoTile
            index={1}
            area="1 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Security Features
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {securityFeatures.map((feature) => (
                  <Box
                    key={feature.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.08)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mb: 0.5 }}
                      >
                        {feature.name}
                      </Typography>
                      <Chip
                        label={feature.priority}
                        size="small"
                        sx={{
                          bgcolor:
                            feature.priority === "high"
                              ? alpha("#FF5252", 0.2)
                              : feature.priority === "medium"
                                ? alpha("#FF9800", 0.2)
                                : alpha("#9E9E9E", 0.2),
                          color:
                            feature.priority === "high"
                              ? "#FF5252"
                              : feature.priority === "medium"
                                ? "#FF9800"
                                : "#9E9E9E",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>

                    {feature.enabled ? (
                      <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                    ) : (
                      <CancelIcon sx={{ color: "#FF5252" }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* ACTIVE DEVICES (Span 6)             */}
          {/* ==================================== */}
          <BentoTile
            index={2}
            area="2 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <DevicesIcon sx={{ color: "#2196F3" }} />
                  <Typography variant="h6" fontWeight={700}>
                    Active Devices
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {devices.filter((d) => d.active).length} active
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
                {devices.map((device) => (
                  <Box
                    key={device.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: device.active
                        ? "rgba(33,150,243,0.1)"
                        : "rgba(255,255,255,0.05)",
                      border: "1px solid",
                      borderColor: device.active
                        ? "rgba(33,150,243,0.3)"
                        : "rgba(255,255,255,0.1)",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: device.active
                          ? "rgba(33,150,243,0.15)"
                          : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: device.active
                            ? "rgba(33,150,243,0.2)"
                            : "rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DevicesIcon
                          sx={{
                            fontSize: 20,
                            color: device.active
                              ? "#2196F3"
                              : "rgba(255,255,255,0.5)",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {device.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {device.type} • {device.location}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: device.active ? "#4CAF50" : "#FF5252",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {device.lastActive}
                      </Typography>
                      <IconButton size="small">
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* LOGIN HISTORY (Span 6)              */}
          {/* ==================================== */}
          <BentoTile
            index={3}
            area="2 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <HistoryIcon sx={{ color: "#2196F3" }} />
                  <Typography variant="h6" fontWeight={700}>
                    Login History
                  </Typography>
                </Box>
                <IconButton size="small">
                  <RefreshIcon />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
                {loginHistory.map((login) => (
                  <Box
                    key={login.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor:
                        login.status === "blocked"
                          ? "rgba(255,82,82,0.1)"
                          : "rgba(255,255,255,0.05)",
                      border: "1px solid",
                      borderColor:
                        login.status === "blocked"
                          ? "rgba(255,82,82,0.3)"
                          : "rgba(255,255,255,0.1)",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor:
                          login.status === "blocked"
                            ? "rgba(255,82,82,0.15)"
                            : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor:
                            login.status === "success"
                              ? "rgba(76,175,80,0.2)"
                              : "rgba(255,82,82,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {login.status === "success" ? (
                          <VerifiedUserIcon
                            sx={{ fontSize: 20, color: "#4CAF50" }}
                          />
                        ) : (
                          <WarningIcon
                            sx={{ fontSize: 20, color: "#FF5252" }}
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {login.device}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {login.time} • {login.location}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={login.status === "success" ? "Success" : "Blocked"}
                      size="small"
                      sx={{
                        bgcolor:
                          login.status === "success"
                            ? "rgba(76,175,80,0.2)"
                            : "rgba(255,82,82,0.2)",
                        color:
                          login.status === "success" ? "#4CAF50" : "#FF5252",
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* AUTHENTICATION METHODS (Span 6)     */}
          {/* ==================================== */}
          <BentoTile
            index={4}
            area="3 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Authentication Methods
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 3,
                  flex: 1,
                }}
              >
                {/* 2FA Card */}
                <Box
                  sx={{
                    gridColumn: "span 1",
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(33,150,243,0.15) 0%, rgba(0,188,212,0.1) 100%)",
                    border: "1px solid rgba(33,150,243,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          bgcolor: "rgba(33,150,243,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LockIcon sx={{ color: "#2196F3" }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          2FA
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Two-Factor Authentication
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Add an extra layer of security to your account
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Chip
                      label="Enabled"
                      color="success"
                      sx={{
                        bgcolor: "rgba(76,175,80,0.2)",
                        color: "#4CAF50",
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      via Google Authenticator
                    </Typography>
                  </Box>
                </Box>

                {/* Biometric Card */}
                <Box
                  sx={{
                    gridColumn: "span 1",
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(156,39,176,0.15) 0%, rgba(233,30,99,0.1) 100%)",
                    border: "1px solid rgba(156,39,176,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          bgcolor: "rgba(156,39,176,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FingerprintIcon sx={{ color: "#9C27B0" }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          Biometric
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Face ID / Touch ID
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Fast and secure login with biometrics
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Chip
                      label="Enabled"
                      color="success"
                      sx={{
                        bgcolor: "rgba(76,175,80,0.2)",
                        color: "#4CAF50",
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Face ID active
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* QUICK ACTIONS (Span 6)              */}
          {/* ==================================== */}
          <BentoTile
            index={5}
            area="3 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Quick Actions
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  flex: 1,
                }}
              >
                <ActionCard
                  title="Change Password"
                  description="Update your account password"
                  color="#2196F3"
                  icon={<LockIcon />}
                />
                <ActionCard
                  title="Manage Devices"
                  description="Review and remove devices"
                  color="#4CAF50"
                  icon={<DevicesIcon />}
                />
                <ActionCard
                  title="Security Alert"
                  description="View recent security events"
                  color="#FF9800"
                  icon={<WarningIcon />}
                />
                <ActionCard
                  title="Recovery Options"
                  description="Set up account recovery"
                  color="#9C27B0"
                  icon={<SecurityIcon />}
                />
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* SECURITY STATS (Span 12)            */}
          {/* ==================================== */}
          <BentoTile
            index={6}
            area="4 / 1 / span 1 / span 12"
            focused={focused}
            setFocused={setFocused}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StatItem
                label="Total Logins"
                value="1,247"
                change="+12%"
                color="#2196F3"
              />
              <StatItem
                label="Blocked Attempts"
                value="3"
                change="-75%"
                color="#FF5252"
              />
              <StatItem label="Devices" value="4" change="+1" color="#4CAF50" />
              <StatItem label="Alerts" value="2" change="0" color="#FF9800" />
              <StatItem
                label="Last Audit"
                value="Today"
                change=""
                color="#9C27B0"
              />
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}

function ActionCard({
  title,
  description,
  color,
  icon,
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: alpha(color, 0.1),
        border: `1px solid ${alpha(color, 0.2)}`,
        cursor: "pointer",
        transition: "all 0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          bgcolor: alpha(color, 0.15),
          transform: "translateY(-4px)",
          boxShadow: `0 8px 32px ${alpha(color, 0.2)}`,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: alpha(color, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}

function StatItem({
  label,
  value,
  change,
  color,
}: {
  label: string;
  value: string;
  change: string;
  color: string;
}) {
  const isPositive = change.startsWith("+");
  const isNegative = change.startsWith("-");

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h3" fontWeight={800} sx={{ color, mb: 0.5 }}>
        {value}
      </Typography>
      {change && (
        <Typography
          variant="caption"
          sx={{
            color: isPositive
              ? "#4CAF50"
              : isNegative
                ? "#FF5252"
                : "text.secondary",
            fontWeight: 600,
          }}
        >
          {change}
        </Typography>
      )}
    </Box>
  );
}
