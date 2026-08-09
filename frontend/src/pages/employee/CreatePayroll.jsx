import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, TextField, Button, Typography, Autocomplete, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import PayslipPreview from "../../components/employee/PayslipPreview";
import EmptyState from "../../components/ui/EmptyState";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { toast, ToastContainer } from "react-toastify";

const numberSchema = Yup.number().min(0, "Cannot be negative").nullable();

const schema = Yup.object({
  employeeId: Yup.string().required("Select an employee"),
  period: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])$/, "Pick a valid month").required("Pay period is required"),
  basicSalary: Yup.number().positive("Basic salary must be positive").required("Basic salary is required"),
  overtimeHours: numberSchema,
  overtimeRate: numberSchema,
  allowances: numberSchema,
  bonus: numberSchema,
  loanDeduction: numberSchema,
});

const CreatePayroll = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    axios
      .get("/employees/", { params: { status: "active" } })
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      period: "",
      basicSalary: "",
      overtimeHours: "",
      overtimeRate: "",
      allowances: "",
      bonus: "",
      loanDeduction: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setPreview(null);
      setSaveError("");
      setPreviewing(true);
      try {
        const res = await axios.post("/payrolls/preview", { ...values, basicSalary: Number(values.basicSalary) || 0 });
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
    try {
      await axios.post("/payrolls/", {
        ...formik.values,
        basicSalary: Number(formik.values.basicSalary) || 0,
        overtimeHours: Number(formik.values.overtimeHours) || 0,
        overtimeRate: Number(formik.values.overtimeRate) || 0,
        allowances: Number(formik.values.allowances) || 0,
        bonus: Number(formik.values.bonus) || 0,
        loanDeduction: Number(formik.values.loanDeduction) || 0,
      });
      toast.success("Pay slip created!");
      setTimeout(() => navigate("/hr/payroll"), 1200);
    } catch (error) {
      setSaveError(error.response?.data?.message || "Failed to save pay slip.");
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
    <>
      <PageHeader title="Payroll Entry" subtitle="Pick an employee, enter earnings for a month and preview the pay slip" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              {employees.length === 0 ? (
                <EmptyState
                  icon={PersonSearchIcon}
                  title="No active employees"
                  description="Create employees before generating pay slips."
                  action={
                    <Button variant="contained" onClick={() => navigate("/hr/employees/new")}>
                      Create employee
                    </Button>
                  }
                />
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Autocomplete
                        options={employees}
                        getOptionLabel={(e) => (typeof e === "string" ? e : `${e.employeeId} · ${e.name}`)}
                        value={employees.find((e) => e.employeeId === formik.values.employeeId) || null}
                        onChange={(_, e) => {
                          formik.setFieldValue("employeeId", e ? e.employeeId : "");
                          formik.setFieldValue("basicSalary", e ? e.basicSalary || "" : "");
                        }}
                        onBlur={formik.handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="employeeId"
                            label="Employee"
                            placeholder="Search by name or ID"
                            error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                            helperText={formik.touched.employeeId && formik.errors.employeeId}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField type="month" label="Pay Period" InputLabelProps={{ shrink: true }} {...fieldProps("period")} />
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
                        {previewing ? <CircularProgress size={22} color="inherit" /> : "Preview Pay Slip"}
                      </Button>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                        Deductions (EPF 8% and APIT) are calculated by the server. Review the live pay slip, then save it.
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          {preview ? <PayslipPreview preview={preview} saving={saving} onSave={handleSave} error={saveError} /> : null}
        </Grid>
      </Grid>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default CreatePayroll;
