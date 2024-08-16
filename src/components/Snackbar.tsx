"use client";

import * as React from "react";
import SnackbarMui, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppContext } from "@/context";

export default function Snackbar() {
  const { openSnackBar, setOpenSnackBar } = useAppContext();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar({ open: false, message: "", severity: "info" });
  };

  return (
    <div>
      <SnackbarMui
        open={openSnackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            openSnackBar.severity as "error" | "info" | "success" | "warning"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openSnackBar.message}
        </Alert>
      </SnackbarMui>
    </div>
  );
}
