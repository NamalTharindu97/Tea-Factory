import React from "react";
import { Card, CardContent, Typography, Box, Grid, Button, Divider, CircularProgress, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { formatMoney } from "../ui/StatCard";

export const PayslipPreview = ({ preview, saving = false, saveLabel = "Save Pay Slip", onSave, error }) => {
  if (!preview) return null;

  const Row = ({ label, value, strong }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75 }}>
      <Typography variant="body2" color={strong ? "text.primary" : "text.secondary"} sx={{ fontWeight: strong ? 600 : 400 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: strong ? 700 : 500 }} className="tabular">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Employee Salary Slip
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ambrosia Tea Co (Pvt) Ltd · {preview.period}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Employee
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {preview.employeeName || "—"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Employee ID
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {preview.employeeId || "—"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              Pay Period
            </Typography>
            <Typography variant="body2">{preview.period}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--primary)", mb: 0.5 }}>
          Earnings
        </Typography>
        <Row label="Basic Salary" value={formatMoney(preview.basicSalary)} />
        <Row label="Overtime" value={formatMoney(preview.overtime)} />
        <Row label="Allowances" value={formatMoney(preview.allowances)} />
        <Row label="Bonus" value={formatMoney(preview.bonus)} />
        <Row label="Total Earnings" value={formatMoney(preview.totalEarnings)} strong />

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--danger)", mb: 0.5 }}>
          Deductions
        </Typography>
        <Row label="EPF (8% of basic)" value={formatMoney(preview.epfEmployee)} />
        <Row label="APIT (PAYE)" value={formatMoney(preview.apitTax)} />
        <Row label="Loan / Advance" value={formatMoney(preview.loanDeduction)} />
        <Row label="Total Deduction" value={formatMoney(preview.totalDeduction)} strong />

        <Divider sx={{ my: 1.5 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "var(--primary-soft)",
            borderRadius: 2,
            px: 2,
            py: 1.5,
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "var(--primary)" }}>
            Net Pay
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary)" }} className="tabular">
            {formatMoney(preview.netPay)}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
          Employer contributions: EPF {formatMoney(preview.epfEmployer)} · ETF {formatMoney(preview.etf)} (not deducted)
        </Typography>

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}

        <Button fullWidth variant="contained" startIcon={saving ? undefined : <SendIcon />} onClick={onSave} disabled={saving || !onSave}>
          {saving ? <CircularProgress size={22} color="inherit" /> : saveLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PayslipPreview;
