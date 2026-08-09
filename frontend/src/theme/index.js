import { createTheme } from "@mui/material/styles";

const palette = {
  light: {
    primary: { main: "#1d7a46", light: "#38a05f", dark: "#16683b", contrastText: "#ffffff" },
    success: { main: "#2f9e44" },
    warning: { main: "#d97706" },
    error: { main: "#c0392b" },
    info: { main: "#2563eb" },
    background: { default: "#f3f6f3", paper: "#ffffff" },
    text: { primary: "#1c2a21", secondary: "#5f7166" },
    divider: "#e3e9e4",
  },
  dark: {
    primary: { main: "#38c172", light: "#4cd087", dark: "#2eb568", contrastText: "#0c140f" },
    success: { main: "#4ade80" },
    warning: { main: "#f59e0b" },
    error: { main: "#e05d4f" },
    info: { main: "#60a5fa" },
    background: { default: "#101612", paper: "#171f1a" },
    text: { primary: "#e7efe9", secondary: "#9db0a3" },
    divider: "#27332b",
  },
};

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...palette[mode],
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "8px 18px",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 10, backgroundColor: "var(--surface)" },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: "var(--border)",
            fontSize: "0.85rem",
          },
          head: { fontWeight: 600 },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 500 } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 16, boxShadow: "var(--shadow-lg)" },
        },
      },
    },
  });
