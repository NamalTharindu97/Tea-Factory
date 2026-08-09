import React from "react";
import { Card, CardContent, Grid, TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageHeader from "../../components/ui/PageHeader";
import PaySheet from "../../components/employee/PaySheet";
import { toast, ToastContainer } from "react-toastify";

const numberSchema = Yup.number().min(0, "Cannot be negative").nullable();

const schema = Yup.object({
  employeeName: Yup.string().required("Employee name is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  basicSalary: Yup.number().positive("Basic salary must be positive").required("Basic salary is required"),
  overtime: numberSchema,
  bonus: numberSchema,
  federalTax: numberSchema,
  stateTax: numberSchema,
  medicare: numberSchema,
});

const PayrollEntry = () => {
  const formik = useFormik({
    initialValues: {
      employeeName: "",
      employeeId: "",
      basicSalary: "",
      overtime: "",
      bonus: "",
      federalTax: "",
      stateTax: "",
      medicare: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      toast.success("Pay slip ready. Review it and save on the right.");
      // Live preview handles rendering; saving happens in <PaySheet>.
    },
  });

  const fieldProps = (name, label) => ({
    fullWidth: true,
    label,
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <>
      <PageHeader title="Payroll Entry" subtitle="Calculate a new employee salary slip" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField {...fieldProps("employeeName", "Employee Name")} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField {...fieldProps("employeeId", "Employee ID")} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("basicSalary", "Basic Salary")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("overtime", "Overtime")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("bonus", "Bonus")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("federalTax", "Federal Tax Rate (%)")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("stateTax", "State Tax Rate (%)")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField type="number" {...fieldProps("medicare", "Medicare Rate (%)")} InputProps={{ inputProps: { min: 0 } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                      Calculate
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                      Review the live pay slip on the right, then click Save Pay Slip.
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <PaySheet formData={formik.values} onSaved={() => formik.resetForm()} />
        </Grid>
      </Grid>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default PayrollEntry;
