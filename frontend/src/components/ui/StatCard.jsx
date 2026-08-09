import React from "react";
import { Card, CardContent, Skeleton, Typography, Box } from "@mui/material";

export const formatMoney = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "Rs : 0.00";
  return `Rs : ${new Intl.NumberFormat("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
};

export const formatNumber = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";
  return new Intl.NumberFormat("en-LK").format(num);
};

const ACCENTS = {
  primary: { color: "var(--primary)", soft: "var(--primary-soft)" },
  accent: { color: "var(--accent)", soft: "var(--accent-soft)" },
  danger: { color: "var(--danger)", soft: "var(--danger-soft)" },
  info: { color: "var(--info)", soft: "var(--primary-soft)" },
};

export const StatCard = ({ title, value, icon: Icon, accent = "primary", suffix, caption, loading = false }) => {
  const tone = ACCENTS[accent] || ACCENTS.primary;

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" height={18} />
              <Skeleton width="80%" height={34} sx={{ mt: 1 }} />
              <Skeleton width="40%" height={14} sx={{ mt: 1 }} />
            </Box>
            <Skeleton variant="circular" width={52} height={52} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "var(--shadow-md)" },
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 700, color: "text.primary" }}>
            {value}
            {suffix ? <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>{suffix}</Typography> : null}
          </Typography>
          {caption ? (
            <Typography variant="caption" color="text.secondary" noWrap>
              {caption}
            </Typography>
          ) : null}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: "var(--radius-md)",
            bgcolor: tone.soft,
            color: tone.color,
            flexShrink: 0,
          }}
        >
          <Icon fontSize="large" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
