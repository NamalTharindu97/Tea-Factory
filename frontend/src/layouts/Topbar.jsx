import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, Avatar, Menu, MenuItem, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAppTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { NAV } from "../config/nav";

const pageTitle = (pathname) => {
  for (const section of NAV) {
    for (const item of section.items) {
      if (pathname === item.path || pathname.startsWith(`${item.path}/`)) return item.label;
    }
  }
  return "Dashboard";
};

const ChangePasswordDialog = ({ open, onClose }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (next.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      await axios.put("/employees/password", { currentPassword: current, newPassword: next });
      toast.success("Password updated!");
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Change Password</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
          <TextField size="small" label="Current password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" />
          <TextField size="small" label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} required autoComplete="new-password" />
          <TextField size="small" label="Confirm new password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required autoComplete="new-password" />
          {error ? (
            <Typography variant="body2" sx={{ color: "var(--danger)" }}>
              {error}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={20} color="inherit" /> : "Update"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export const Topbar = ({ onMenu }) => {
  const { mode, toggleTheme } = useAppTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "var(--surface)",
        color: "var(--text)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Toolbar sx={{ minHeight: "var(--topbar-height) !important", gap: 1.5 }}>
        <Tooltip title="Toggle menu">
          <IconButton onClick={onMenu} edge="start" sx={{ color: "var(--text-muted)" }} aria-label="Toggle navigation menu">
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {pageTitle(location.pathname)}
        </Typography>

        <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          <IconButton onClick={toggleTheme} sx={{ color: "var(--text-muted)" }} aria-label="Toggle dark mode">
            {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Tooltip>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, cursor: "pointer" }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar alt={user?.name} src={user?.img} sx={{ width: 36, height: 36, bgcolor: "var(--primary)", fontSize: "0.9rem" }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircleOutlinedIcon />}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1.2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user?.name || "Guest"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.role}
            </Typography>
          </Box>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <MenuItem disabled>
            <Box sx={{ lineHeight: 1.3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { setAnchorEl(null); setPasswordOpen(true); }}>
            <LockOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
            Change password
          </MenuItem>
          <MenuItem onClick={logout} sx={{ color: "var(--danger)" }}>
            <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
            Log out
          </MenuItem>
        </Menu>
      </Toolbar>
      <ChangePasswordDialog open={passwordOpen} onClose={() => setPasswordOpen(false)} />
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </AppBar>
  );
};

export default Topbar;
