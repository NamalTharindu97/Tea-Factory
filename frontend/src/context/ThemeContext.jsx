import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme";

const ThemeContext = createContext({ mode: "light", toggleTheme: () => {} });

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const stored = window.localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () => setMode((m) => (m === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const muiTheme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
