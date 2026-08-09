import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, Button } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation } from "react-router-dom";
import { NAV } from "../config/nav";
import { useAuth } from "../context/AuthContext";
import logo from "../asserts/EmployeAs/Img/logo.png";

export const SidebarContent = ({ collapsed = false, onNavigate }) => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const section = NAV.find((s) => s.role === role);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "var(--surface)" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: collapsed ? 1 : 2.5,
          py: 2,
          minHeight: 72,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <img src={logo} alt="Ambrosia Tea logo" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
        {!collapsed ? (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.15, whiteSpace: "nowrap" }}>
              Ambrosia Tea
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Factory Management
            </Typography>
          </Box>
        ) : null}
      </Box>

      <Box sx={{ px: collapsed ? 1 : 2.5, pt: 2.5, pb: 1 }}>
        {!collapsed ? (
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.08em" }}>
            {section?.title || "Menu"}
          </Typography>
        ) : null}
      </Box>

      <List sx={{ px: 1, flex: 1, overflowY: "auto" }}>
        {(section?.items || []).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const link = (
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={onNavigate}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1 : 1.5,
                py: 1,
                color: active ? "var(--primary)" : "var(--text-muted)",
                "&.Mui-selected": { bgcolor: "var(--primary-soft)", color: "var(--primary)" },
                "&.Mui-selected:hover": { bgcolor: "var(--primary-soft)" },
                "&:hover": { bgcolor: "var(--surface-muted)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 1.5, color: "inherit" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              {!collapsed ? (
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: active ? 600 : 500 }} />
              ) : null}
            </ListItemButton>
          );
          return collapsed ? (
            <Tooltip key={item.path} title={item.label} placement="right">
              {link}
            </Tooltip>
          ) : (
            <div key={item.path}>{link}</div>
          );
        })}
      </List>

      <Box sx={{ borderTop: "1px solid var(--border)", p: collapsed ? 1 : 1.5 }}>
        {collapsed ? (
          <Tooltip title="Log out" placement="right">
            <Button onClick={logout} sx={{ minWidth: 0, width: "100%", color: "var(--danger)" }}>
              <LogoutOutlinedIcon fontSize="small" />
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={logout}
            startIcon={<LogoutOutlinedIcon />}
            sx={{ width: "100%", justifyContent: "flex-start", color: "var(--danger)" }}
          >
            Log out
          </Button>
        )}
        {!collapsed && user ? (
          <Typography variant="caption" color="text.faint" sx={{ display: "block", textAlign: "center", mt: 1, color: "var(--text-faint)" }}>
            Signed in as {user.name}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default SidebarContent;
