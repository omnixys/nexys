import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StepSuccess() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ textAlign: "center" }}
    >
      🎉🎉🎉
      <Typography variant="h4" mt={2}>
        Account created!
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        Welcome to Omnixys
      </Typography>
      <Link href="/login">
        <Button variant="contained" sx={{ mt: 3 }}>
          Go to Login
        </Button>
      </Link>
    </motion.div>
  );
}
