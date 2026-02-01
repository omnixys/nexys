"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Navbar from "./navbar";

const MotionBox = motion(Box);

interface TransitionProviderProps {
  children: ReactNode;
}

export default function TransitionProvider({
  children,
}: TransitionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <Box
        key={pathname}
        sx={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(to bottom, rgb(219 234 254), rgb(254 202 202))", // blue-100 → red-100
          zIndex: 1300,
        }}
      >
        {/* TOP CURTAIN */}
        <MotionBox
          sx={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "black",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            zIndex: 40,
          }}
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* PAGE LABEL */}
        <MotionBox
          sx={{
            position: "fixed",
            inset: 0,
            m: "auto",
            width: "fit-content",
            height: "fit-content",
            color: "white",
            fontSize: "6rem", // text-8xl
            cursor: "default",
            zIndex: 50,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathname.substring(1)}
        </MotionBox>

        {/* BOTTOM CURTAIN */}
        <MotionBox
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "black",
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            zIndex: 30,
          }}
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />

        {/* NAVBAR */}
        <Box sx={{ height: 96 }}>
          {/* <Navbar /> */}
        </Box>

        {/* PAGE CONTENT */}
        <Box sx={{ height: "calc(100vh - 6rem)" }}>{children}</Box>
      </Box>
    </AnimatePresence>
  );
}
