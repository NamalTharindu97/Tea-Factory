import React from "react";
import { Box, Typography, Stack } from "@mui/material";

export const PageHeader = ({ title, subtitle, actions }) => (
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
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.2 }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
    {actions ? <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>{actions}</Stack> : null}
  </Box>
);

export default PageHeader;
