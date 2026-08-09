import React from "react";
import { Box, Typography } from "@mui/material";

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      py: 8,
      px: 3,
      gap: 1.5,
    }}
  >
    {Icon ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: "50%",
          bgcolor: "var(--primary-soft)",
          color: "var(--primary)",
        }}
      >
        <Icon sx={{ fontSize: 40 }} />
      </Box>
    ) : null}
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    {description ? (
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380 }}>
        {description}
      </Typography>
    ) : null}
    {action ? <Box sx={{ mt: 1 }}>{action}</Box> : null}
  </Box>
);

export default EmptyState;
