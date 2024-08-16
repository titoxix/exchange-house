"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext({
  openBackdrop: false,
  setOpenBackdrop: (open: boolean) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  return (
    <AppContext.Provider value={{ openBackdrop, setOpenBackdrop }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
