'use client';

import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

import DataObjectIcon from '@mui/icons-material/DataObject';
import ExtensionIcon from '@mui/icons-material/Extension';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import GlassCard from '../ui/GlassCard';

const USPs = [
  {
    icon: <ExtensionIcon fontSize="large" />,
    title: 'Modular & Erweiterbar',
    text: 'Jeder Service ist unabhängig einsetzbar und kombinierbar.',
  },
  {
    icon: <LockPersonIcon fontSize="large" />,
    title: 'Sichere Authentifizierung',
    text: 'Keycloak-Support für SSO, Rollen und Berechtigungen.',
  },
  {
    icon: <RocketLaunchIcon fontSize="large" />,
    title: 'Schnell deploybar',
    text: 'GitHub Actions + Docker für jeden Microservice.',
  },
  {
    icon: <DataObjectIcon fontSize="large" />,
    title: 'Nur GraphQL',
    text: 'Typisierte Schnittstelle, kein REST.',
  },
  {
    icon: <QueryStatsIcon fontSize="large" />,
    title: 'Echtzeit-Daten',
    text: 'Dashboards mit Prometheus, Tempo und Grafana.',
  },
  {
    icon: <PublicIcon fontSize="large" />,
    title: 'Open Source & Global',
    text: 'GPL-lizenziert, i18n-fähig, API-first.',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: 'success.light' }} />,
    title: 'Modular aufgebaut',
  },
  {
    icon: <LockIcon sx={{ fontSize: 40, color: '#90CAF9' }} />,
    title: 'Datenschutzkonform',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#FFD54F' }} />,
    title: 'Skalierbar & performant',
  },
];

export default function USPGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: { perView: 1.1, spacing: 12 },
  });

  return (
    <Box
      sx={{
        py: 10,
        px: 2,
        backdropFilter: "blur(8px)",
//         background: `
//   radial-gradient(
//     80% 80% at 50% 0%,
//     rgba(168, 62, 180, 0.18),
//     rgba(10, 5, 30, 0.85)
//   )
// `,
      }}
    >
      <Typography
        variant="h4"
        color="#fff"
        align="center"
        fontWeight="bold"
        mb={6}
      >
        Warum OmnixysSphere?
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: 4,
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        {USPs.map((usp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <GlassCard>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  width: 48,
                  height: 48,
                  mt: 0.5,
                }}
              >
                {usp.icon}
              </Avatar>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#fff" }}
                >
                  {usp.title}
                </Typography>

                {usp.text && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.75, color: "rgba(255,255,255,0.75)" }}
                  >
                    {usp.text}
                  </Typography>
                )}
              </Box>
            </GlassCard>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
