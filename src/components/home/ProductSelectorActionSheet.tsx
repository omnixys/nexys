"use client";

import React from "react";
import { Box, Typography, Fade } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "../../mock/products.mock";
import { useTypedTranslations } from "../../i18n/useTypedTranslations";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProductSelectorActionSheet({ open, onClose }: Props) {
  const router = useRouter();
    const t = useTypedTranslations("products");

  const spring = useSpring({
    from: { y: 300, opacity: 0.8 },
    to: {
      y: open ? 0 : 300,
      opacity: open ? 1 : 0,
    },
    config: { tension: 260, friction: 22 },
  });

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <>
      <Fade in={open}>
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
          }}
        />
      </Fade>

      <animated.div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: open ? 4000 : 0,
          transform: spring.y.to((y) => `translateY(${y}px)`),
          opacity: spring.opacity,
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            p: 2,
            pb: 4,
            bgcolor: "background.default",
            boxShadow: "0 -8px 30px rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t("choose")}
          </Typography>

          {PRODUCTS.map((p) => (
            <Box
              key={p.id}
              onClick={() => handleSelect(p.href)}
              sx={{
                p: 2,
                borderRadius: 3,
                mb: 1,
                bgcolor: "background.paper",
                cursor: "pointer",
                transition: "0.2s",
                ":hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography fontWeight={600}>{t(p.nameKey)}</Typography>
            </Box>
          ))}

          <Box
            onClick={onClose}
            sx={{
              mt: 3,
              textAlign: "center",
              p: 2,
              borderRadius: 3,
              bgcolor: "grey.800",
              cursor: "pointer",
            }}
          >
            {t("cancel")}
          </Box>
        </Box>
      </animated.div>
    </>
  );
}
