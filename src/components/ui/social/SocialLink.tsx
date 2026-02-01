import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <Link href={href} target="_blank" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: 14,
            "&:hover": {
              borderColor: "#a855f7",
            },
          }}
        >
          <Typography fontSize={14}>{label}</Typography>
        </Box>
      </Link>
    </motion.div>
  );
}
