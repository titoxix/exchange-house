"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext({
  openBackdrop: false,
  setOpenBackdrop: (open: boolean) => {},
  openSnackBar: { open: false, message: "", severity: "info" },
  setOpenSnackBar: ({
    open,
    message,
    severity,
  }: {
    open: boolean;
    message: string;
    severity: "error" | "info" | "success" | "warning";
  }) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  return (
    <AppContext.Provider
      value={{ openBackdrop, setOpenBackdrop, openSnackBar, setOpenSnackBar }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
