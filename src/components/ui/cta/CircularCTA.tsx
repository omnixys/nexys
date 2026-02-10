import Link from "next/link";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

type CircularCTAProps = {
  label: string;
  href: string;
  text: string;
};

export function CircularCTA({ label, href, text }: CircularCTAProps) {
  return (
    <Box position="relative" sx={{zIndex: 1300}}>
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        viewBox="0 0 300 300"
        width={360}
        height={360}
        style={{ overflow: "visible" }}
      >
        <defs>
          <path
            id={`circlePath-${label}`}
            d="M 150,150 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>

        <text
          fill="#fff"
          style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          <textPath href={`#circlePath-${label}`} fontSize={14}>
            {text}
          </textPath>
        </text>
      </motion.svg>

      <Link href={href}>
        <Box
          sx={{
            width: { xs: 72, md: 112 },
            height: { xs: 72, md: 112 },
            bgcolor: "#fff",
            color: "#000",
            borderRadius: "50%",
            position: "absolute",
            inset: 0,
            m: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 24px rgba(255,255,255,0.6)",
            },
          }}
        >
          {label}
        </Box>
      </Link>
    </Box>
  );
}
