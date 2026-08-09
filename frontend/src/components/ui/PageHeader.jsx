import React from "react";
import { Box, Typography, Stack } from "@mui/material";

export const PageHeader = ({ title, subtitle, actions, eyebrow }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      alignItems: "flex-start",
      justifyContent: "space-between",
      mb: 3,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, minWidth: 0 }}>
      <Box sx={{ width: 4, height: "auto", alignSelf: "stretch", minHeight: 44, borderRadius: "var(--radius-full)", background: "linear-gradient(180deg, var(--primary), var(--accent))", flexShrink: 0 }} />
      <Box sx={{ minWidth: 0 }}>
        {eyebrow ? (
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.08em", lineHeight: 1.4 }}>
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
    </Box>
    {actions ? <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap" }}>{actions}</Stack> : null}
  </Box>
);

export default PageHeader;
