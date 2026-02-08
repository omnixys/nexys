/**
 * @file /security/_components/tiles/QuickActionsTile.tsx
 * @description Quick actions tile - opens modal
 */

"use client";

import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DevicesIcon from "@mui/icons-material/Devices";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import { useRouter } from "next/navigation";

import BentoTile from "./BentoTile";
import ActionCard from "./ActionCard";

export default function QuickActionsTile({
  index,
  area,
  focused,
  setFocused,
}: {
  index: number;
  area?: string;
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const router = useRouter();

  return (
    <BentoTile
      index={index}
      area={area}
      focused={focused}
      setFocused={setFocused}
      onClick={() => router.push("/security/actions")}
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
        <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
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
  );
}
