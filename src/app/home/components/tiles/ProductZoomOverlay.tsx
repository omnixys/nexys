"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductZoomOverlay({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        bgcolor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(22px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        sx={{
          width: 420,
          borderRadius: 6,
          p: 5,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
          border: "1px solid rgba(255,255,255,0.25)",
          textAlign: "center",
        }}
      >
        <Image src={product.icon} alt={product.name} width={80} height={80} />
        <Typography variant="h5" sx={{ mt: 2 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "rgba(255,255,255,0.7)" }}
        >
          {product.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
