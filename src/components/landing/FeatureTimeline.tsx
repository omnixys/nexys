'use client';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MovieIcon from '@mui/icons-material/Movie';
import StoreIcon from '@mui/icons-material/Store';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';

// Timeline-Daten
const MODULE_DETAILS = [
  { name: "Social Feed", year: "2025", icon: <DynamicFeedIcon /> },
  {
    name: "Shop",
    year: "2023",
    icon: <StoreIcon />,
    description:
      "Unsere Shop-Plattform ermöglicht den einfachen Verkauf digitaler und physischer Produkte – modular, skalierbar und 100 % via GraphQL steuerbar.",
    image: "/shop.png", // im public-Ordner
  },
  {
    name: "Bank",
    year: "2023",
    icon: <AccountBalanceIcon />,
    description:
      "Das Omnixys-Banking-Modul deckt Giro-, Spar- und Kreditkonten ab und integriert sich nahtlos mit dem Payment- und Transaction-Service.",
    image: "/shop.png", // im public-Ordner
  },
  {
    name: "Immobilien",
    year: "2023",
    icon: <HomeWorkIcon />,
    video: "/modules/bank.mp4",
  },
  { name: "Auktion", year: "2024", icon: <GavelIcon /> },
  { name: "Reisen", year: "2024", icon: <TravelExploreIcon /> },
  { name: "Kino", year: "2024", icon: <MovieIcon /> },
  { name: "Auto", year: "2025", icon: <DirectionsCarIcon /> },
  { name: "Aktivitäten", year: "2025", icon: <LocalActivityIcon /> },
];

export default function FeatureTimeline() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<
    null | (typeof MODULE_DETAILS)[0]
  >(null);

  const handleOpen = (modul: (typeof MODULE_DETAILS)[0]) => {
    setSelectedModule(modul);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModule(null);
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        color="#fff"
        sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}
      >
        Feature-Timeline der OmnixysSphere
      </Typography>
      <Box
        sx={{
          position: "relative",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "2px",
            backgroundColor: "rgba(168,62,180,0.35)",
          },
        }}
      >
        {MODULE_DETAILS.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: { xs: 24, md: 0 },
              x: {
                xs: 0,
                md: index % 2 === 0 ? -60 : 60,
              },
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              marginBottom: 60,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row-reverse" : "row",
                },
                alignItems: "center",
                gap: 3,
                width: "100%",
                justifyContent: "space-between",
                maxWidth: 900,
              }}
            >
              <GlassCard
                variant="soft"
                sx={{
                  width: { xs: "100%", md: "45%" },
                  cursor: "pointer",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 32px rgba(168,62,180,0.45)",
                }}
              >
                {/* Icon-Kreis */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 16px rgba(168,62,180,0.4)",
                    mb: 1,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography sx={{ color: "#fff" }}>{item.name}</Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}
                  variant="body2"
                >
                  {item.year} – Teil der modularen Plattform
                </Typography>

                <Button
                  size="small"
                  sx={{
                    mt: 2,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: 999,
                    textTransform: "none",
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.06)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.12)",
                    },
                  }}
                  onClick={() => handleOpen(item)}
                >
                  Mehr erfahren
                </Button>
              </GlassCard>
            </Box>

            {/* Jahr unterhalb auf kleinen Geräten */}
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.6)",
                display: { md: "none" },
              }}
            >
              {item.year}
            </Typography>
            {/* Punkt auf Linie */}
            <Box
              sx={{
                position: "absolute",
                top: "32px",
                left: "calc(50% - 8px)",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 0 12px rgba(168,62,180,0.6)",
                zIndex: 2,
              }}
            />
          </motion.div>
        ))}
      </Box>
      <Dialog
        aria-labelledby="module-dialog-title"
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(20,12,40,0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 40px rgba(168,62,180,0.45)",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="module-dialog-title">
          {selectedModule?.name}
        </DialogTitle>
        <DialogContent>
          {selectedModule?.image && (
            <Box
              sx={{
                mb: 2,
                textAlign: "center",
                "& img": { borderRadius: 2, maxWidth: "100%" },
                position: "relative",
                width: "100%",
                height: 400,
              }}
            >
              <Image
                src={selectedModule.image}
                alt={selectedModule.name}
                fill
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </Box>
          )}

          {selectedModule?.video && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 360,
                mb: 2,
              }}
            >
              <video
                src={selectedModule.video}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </Box>
          )}

          {!selectedModule?.image && !selectedModule?.video && (
            <Typography sx={{ opacity: 0.7 }}>
              Weitere Details folgen in Kürze.
            </Typography>
          )}

          <Typography variant="body1">{selectedModule?.description}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
