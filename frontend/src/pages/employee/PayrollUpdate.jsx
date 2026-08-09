import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, TextField, Button, MenuItem, CircularProgress, Box, Skeleton } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import PayslipPreview from "../../components/employee/PayslipPreview";
import EmptyState from "../../components/ui/EmptyState";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { toast, ToastContainer } from "react-toastify";

const numberSchema = Yup.number().min(0, "Cannot be negative").nullable();

const PayrollUpdateForm = ({ payroll, id }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const employeeId = payroll.employee?.employeeId || (typeof payroll.employee === "string" ? payroll.employee : "");

  const formik = useFormik({
    initialValues: {
      period: payroll.period,
      basicSalary: payroll.basicSalary,
      overtimeHours: payroll.overtimeHours || "",
      overtimeRate: payroll.overtimeRate || "",
      allowances: payroll.allowances || "",
      bonus: payroll.bonus || "",
      loanDeduction: payroll.loanDeduction || "",
      status: payroll.status || "pending",
    },
    validationSchema: Yup.object({
      period: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])$/, "Pick a valid month").required("Pay period is required"),
      basicSalary: Yup.number().positive("Basic salary must be positive").required("Basic salary is required"),
      overtimeHours: numberSchema,
      overtimeRate: numberSchema,
      allowances: numberSchema,
      bonus: numberSchema,
      loanDeduction: numberSchema,
    }),
    onSubmit: async (values) => {
      setPreview(null);
      setSaveError("");
      setPreviewing(true);
      try {
        const res = await axios.post("/payrolls/preview", { employeeId, period: values.period, ...values });
        setPreview(res.data);
      } catch (error) {
        setSaveError(error.response?.data?.message || "Failed to preview pay slip.");
      } finally {
        setPreviewing(false);
      }
    },
  });

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    const payload = { ...formik.values };
    for (const k of ["basicSalary", "overtimeHours", "overtimeRate", "allowances", "bonus", "loanDeduction"]) {
      payload[k] = Number(payload[k]) || 0;
    }
    try {
      await axios.put(`/payrolls/${id}`, payload);
      toast.success("Pay slip updated!");
      setTimeout(() => navigate("/hr/payroll"), 1200);
    } catch (error) {
      setSaveError(error.response?.data?.message || "Failed to update pay slip.");
    } finally {
      setSaving(false);
    }
  };

  const fieldProps = (name) => ({
    fullWidth: true,
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={7}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ mb: 2 }}>
              <TextField label="Employee" value={payroll.employeeName} disabled fullWidth />
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField type="month" label="Pay Period" InputLabelProps={{ shrink: true }} {...fieldProps("period")} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select label="Status" {...fieldProps("status")}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" label="Basic Salary" {...fieldProps("basicSalary")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" label="Overtime Hours" {...fieldProps("overtimeHours")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" label="Overtime Rate (per hour)" {...fieldProps("overtimeRate")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField type="number" label="Allowances" {...fieldProps("allowances")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField type="number" label="Bonus" {...fieldProps("bonus")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField type="number" label="Loan / Advance Deduction" {...fieldProps("loanDeduction")} InputProps={{ inputProps: { min: 0 } }} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }} disabled={previewing}>
                    {previewing ? <CircularProgress size={22} color="inherit" /> : "Preview Changes"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={5}>
        {preview ? <PayslipPreview preview={preview} saving={saving} onSave={handleSave} saveLabel="Update Pay Slip" error={saveError} /> : null}
      </Grid>
    </Grid>
  );
};

const PayrollUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState(location.state?.Payroll || null);
  const [loading, setLoading] = useState(!location.state?.Payroll);

  useEffect(() => {
    if (payroll) return;
    axios
      .get(`/payrolls/${id}`)
      .then((res) => setPayroll(res.data))
      .catch(() => setPayroll(null))
      .finally(() => setLoading(false));
  }, [id, payroll]);

  return (
    <>
      <PageHeader title="Update Payroll" subtitle={payroll ? `Editing pay slip for ${payroll.employeeName}` : "Update a pay slip"} />
      {loading ? (
        <Card>
          <CardContent>
            <Skeleton height={24} sx={{ mb: 2 }} />
            <Skeleton height={80} />
            <Skeleton height={80} sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      ) : !payroll ? (
        <Card>
          <EmptyState
            icon={ErrorOutlineIcon}
            title="No pay slip selected"
            description="This pay slip could not be found. It may have been deleted."
            action={
              <Button variant="contained" onClick={() => navigate("/hr/payroll")}>
                Back to payroll summary
              </Button>
            }
          />
        </Card>
      ) : (
        <PayrollUpdateForm payroll={payroll} id={id} />
      )}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default PayrollUpdate;
