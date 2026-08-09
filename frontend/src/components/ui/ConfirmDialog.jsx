import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export const ConfirmDialog = ({ open, title, message, confirmLabel = "Delete", cancelLabel = "Cancel", loading = false, onConfirm, onClose, danger = true }) => (
  <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onClose} color="inherit" disabled={loading}>
        {cancelLabel}
      </Button>
      <Button onClick={onConfirm} color={danger ? "error" : "primary"} variant="contained" disabled={loading}>
        {loading ? "Please wait..." : confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
