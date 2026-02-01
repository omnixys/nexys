import { motion } from "framer-motion";

export function Checkmark() {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 52 52"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M14 27 L22 35 L38 18"
        fill="none"
        stroke="#4ade80"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
