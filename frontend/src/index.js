import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./api/axios";
import App from "./App";
import { AppThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/tokens.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <AppThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppThemeProvider>
    </MotionConfig>
  </React.StrictMode>
);
