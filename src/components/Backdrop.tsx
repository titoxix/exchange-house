"use client";

import React from "react";
import { CircularProgress } from "@nextui-org/react";
import BackdropMui from "@mui/material/Backdrop";
import { useAppContext } from "@/context";

export default function Backdrop() {
  const { openBackdrop } = useAppContext();
  return (
    <BackdropMui
      sx={{ zIndex: 100 }}
      className="backdrop-blur-sm"
      open={openBackdrop}
    >
      <CircularProgress aria-label="Loading..." size="lg" />
    </BackdropMui>
  );
}
