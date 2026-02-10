"use client";

import { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  credentials: React.ReactNode;
  providers: React.ReactNode;
};

export default function AuthTabs({ credentials, providers }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tab, setTab] = useState(0);

  // 👉 Desktop: beide nebeneinander
  if (!isMobile) {
    return (
      <>
        {credentials}
        {providers}
      </>
    );
  }

  // 👉 Mobile: Tabs
  return (
    <Box width="100%">
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            fontWeight: 600,
            color: "text.secondary",
          },
          "& .Mui-selected": {
            color: "primary.main",
          },
        }}
      >
        <Tab label="Login" />
        <Tab label="Provider" />
      </Tabs>

      <Box>
        {tab === 0 && credentials}
        {tab === 1 && providers}
      </Box>
    </Box>
  );
}
