import React from "react";
import "./payrollForm.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useFormik } from "formik";
import * as yup from "yup";

export const PayrollForm = () => {
  const validationSchema = yup.object().shape({
    employeeName: yup.string().required("Employee name is required"),
    employeeId: yup.string().required("Employee ID is required"),
    basicSalary: yup.number().required("Basic salary is required").positive("Basic salary must be positive"),
    overtime: yup.number().min(0, "Overtime cannot be negative").positive("Basic salary must be positive"),
    bonus: yup.number().min(0, "Bonus cannot be negative").positive("Basic salary must be positive"),
    federalTax: yup.number().min(0, "Federal tax cannot be negative").positive("Basic salary must be positive"),
    stateTax: yup.number().min(0, "State tax cannot be negative").positive("Basic salary must be positive"),
    medicare: yup.number().min(0, "Medicare cannot be negative").positive("Basic salary must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      employeeId: "",
      basicSalary: "",
      overtime: null,
      bonus: null,
      federalTax: null,
      stateTax: null,
      medicare: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    palette: {
      primary: {
        main: green["A400"],
      },
    },
  });
  const inputBaseStyles = {
    marginBottom: "1rem",
    "& .MuiInputBase-root": {
      height: "45px", // set the height here
      color: "whitesmoke",
    },
    //hide to number felads arrows
    "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  };

  return (
    <div className="Payroll-form">
      <ThemeProvider theme={theme}>
        <form className="payroll-form-inner" onSubmit={formik.handleSubmit}>
          <TextField
            id="filled-basic"
            label="Employee Name"
            variant="filled"
            name="employeeName"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
            helperText={formik.touched.employeeName && formik.errors.employeeName}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Employee ID"
            variant="filled"
            name="employeeId"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Basic Salary"
            variant="filled"
            type="number"
            name="basicSalary"
            value={formik.values.basicSalary}
            onChange={formik.handleChange}
            error={formik.touched.basicSalary && Boolean(formik.errors.basicSalary)}
            helperText={formik.touched.basicSalary && formik.errors.basicSalary}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Overtime"
            variant="filled"
            type="number"
            name="overtime"
            value={formik.values.overtime}
            onChange={formik.handleChange}
            error={formik.touched.overtime && Boolean(formik.errors.overtime)}
            helperText={formik.touched.overtime && formik.errors.overtime}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Bonus"
            variant="filled"
            type="number"
            name="bonus"
            value={formik.values.bonus}
            onChange={formik.handleChange}
            error={formik.touched.bonus && Boolean(formik.errors.bonus)}
            helperText={formik.touched.bonus && formik.errors.bonus}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Federal Tax"
            variant="filled"
            type="number"
            name="federalTax"
            value={formik.values.federalTax}
            onChange={formik.handleChange}
            error={formik.touched.federalTax && Boolean(formik.errors.federalTax)}
            helperText={formik.touched.federalTax && formik.errors.federalTax}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="State Tax"
            variant="filled"
            type="number"
            name="stateTax"
            value={formik.values.stateTax}
            onChange={formik.handleChange}
            error={formik.touched.stateTax && Boolean(formik.errors.stateTax)}
            helperText={formik.touched.stateTax && formik.errors.stateTax}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <TextField
            id="filled-basic"
            label="Medicare"
            variant="filled"
            type="number"
            name="medicare"
            value={formik.values.medicare}
            onChange={formik.handleChange}
            error={formik.touched.medicare && Boolean(formik.errors.medicare)}
            helperText={formik.touched.medicare && formik.errors.medicare}
            onBlur={formik.handleBlur}
            sx={inputBaseStyles}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" className="profile-btn" sx={{ marginBottom: "1rem" }}>
            calculate
          </Button>
        </form>
      </ThemeProvider>
    </div>
  );
};
