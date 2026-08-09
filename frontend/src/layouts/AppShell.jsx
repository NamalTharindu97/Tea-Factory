import React, { useState } from "react";
import { Box, Drawer, Toolbar, CircularProgress, useMediaQuery, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import SidebarContent from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const COLLAPSED_WIDTH = 76;
const FULL_WIDTH = 264;

export const AppShell = () => {
  const { user, ready } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = collapsed ? COLLAPSED_WIDTH : FULL_WIDTH;

  if (!ready) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", bgcolor: "var(--bg)" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const toggleMenu = () => {
    if (isDesktop) {
      setCollapsed((c) => !c);
    } else {
      setMobileOpen((m) => !m);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "var(--bg)" }}>
      <Topbar onMenu={toggleMenu} />

      {isDesktop ? (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            "& .MuiDrawer-paper": { width: drawerWidth, overflowX: "hidden", transition: "width 0.2s ease", borderRight: "1px solid var(--border)" },
          }}
        >
          <Toolbar sx={{ minHeight: "var(--topbar-height) !important" }} />
          <SidebarContent collapsed={collapsed} />
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: FULL_WIDTH, borderRight: "1px solid var(--border)" } }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Toolbar sx={{ minHeight: "var(--topbar-height) !important" }} />
        <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 2 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AppShell;
