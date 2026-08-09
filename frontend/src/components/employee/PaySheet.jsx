import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, Button, Divider, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import { formatMoney } from "../ui/StatCard";

const num = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export const PaySheet = ({ formData, id, type, onSaved }) => {
  const [saving, setSaving] = useState(false);

  const basicSalary = num(formData.basicSalary);
  const overtime = num(formData.overtime);
  const bonus = num(formData.bonus);
  const totalEarnings = basicSalary + overtime + bonus;

  const federalTax = totalEarnings * (num(formData.federalTax) / 100);
  const stateTax = totalEarnings * (num(formData.stateTax) / 100);
  const medicare = totalEarnings * (num(formData.medicare) / 100);
  const totalDeduction = federalTax + stateTax + medicare;
  const netPay = totalEarnings - totalDeduction;

  const toFixed = (v) => Number(v.toFixed(2));

  const handleSave = async () => {
    setSaving(true);
    const body = {
      empName: formData.employeeName,
      empId: formData.employeeId,
      basicSalary: toFixed(basicSalary),
      overtime: toFixed(overtime),
      bonus: toFixed(bonus),
      totoalEarnings: toFixed(totalEarnings),
      fedaralTax: toFixed(federalTax),
      stateTax: toFixed(stateTax),
      medicare: toFixed(medicare),
      totalDeduction: toFixed(totalDeduction),
      netPay: toFixed(netPay),
    };
    try {
      if (type === "update") {
        await axios.put(`/payrolls/${id}`, body);
        toast.success("Pay slip updated!");
      } else {
        await axios.post("/payrolls/", body);
        toast.success("Pay slip created!");
      }
      if (onSaved) onSaved();
    } catch {
      toast.error("Failed to save pay slip. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
            Ambrosia Tea Co (Pvt) Ltd
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Employee Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formData.employeeName || "—"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Employee ID
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formData.employeeId || "—"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              Pay Date
            </Typography>
            <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--primary)", mb: 0.5 }}>
          Earnings
        </Typography>
        <Row label="Basic Salary" value={formatMoney(basicSalary)} />
        <Row label="Overtime" value={formatMoney(overtime)} />
        <Row label="Bonus" value={formatMoney(bonus)} />
        <Row label="Total Earnings" value={formatMoney(totalEarnings)} strong />

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--danger)", mb: 0.5 }}>
          Deductions
        </Typography>
        <Row label="Federal Tax" value={formatMoney(federalTax)} />
        <Row label="State Tax" value={formatMoney(stateTax)} />
        <Row label="Medicare" value={formatMoney(medicare)} />
        <Row label="Total Deduction" value={formatMoney(totalDeduction)} strong />

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
            {formatMoney(netPay)}
          </Typography>
        </Box>

        <Button fullWidth variant="contained" startIcon={saving ? undefined : <SendIcon />} onClick={handleSave} disabled={saving} sx={{ mt: 1 }}>
          {saving ? <CircularProgress size={22} color="inherit" /> : type === "update" ? "Update Pay Slip" : "Save Pay Slip"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaySheet;
