import React from "react";
import { Box, Button, Card, CardContent, Grid, TextField, MenuItem, Autocomplete, RadioGroup, FormControlLabel, Radio, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ROLES = ["HR Manager", "Inventory Manager", "Suplier Manager", "Production Manager", "HR Assistant", "Inventory Clerk", "Production Worker", "Quality Inspector"];
const DEPARTMENTS = ["General", "Production", "Warehouse", "Quality", "Administration", "Finance"];

const EmployeeUpdateForm = ({ employee, id }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      nic: employee.nic || "",
      gender: employee.gender,
      age: employee.age,
      role: employee.role,
      department: employee.department || "General",
      position: employee.position || "",
      basicSalary: employee.basicSalary || "",
      epfNo: employee.epfNo || "",
      bankAccount: employee.bankAccount || "",
      address: employee.address || "",
      hireDate: employee.hireDate ? String(employee.hireDate).slice(0, 10) : "",
      status: employee.status || "active",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      age: Yup.number().min(16, "Must be at least 16").max(90, "Must be at most 90").required("Age is required"),
      role: Yup.string().required("Role is required"),
      basicSalary: Yup.number().min(0, "Cannot be negative"),
      password: Yup.string().min(6, "Must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const payload = { ...values, basicSalary: Number(values.basicSalary) || 0 };
      if (!payload.password) delete payload.password;
      try {
        await axios.put(`/employees/${id}`, payload);
        toast.success("Employee updated!");
        setTimeout(() => navigate("/hr/employees"), 1200);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update employee.");
      } finally {
        setSubmitting(false);
      }
    },
  });

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
    <Card sx={{ maxWidth: 900 }}>
      <CardContent sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" {...fieldProps("name")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Employee ID" value={employee.employeeId} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" {...fieldProps("email")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" {...fieldProps("phone")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="NIC" {...fieldProps("nic")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Age" type="number" {...fieldProps("age")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={ROLES}
                value={formik.values.role}
                onChange={(_, v) => formik.setFieldValue("role", v || "")}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField {...params} name="role" label="Role" error={formik.touched.role && Boolean(formik.errors.role)} helperText={formik.touched.role && formik.errors.role} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={DEPARTMENTS}
                value={formik.values.department}
                onChange={(_, v) => formik.setFieldValue("department", v || "General")}
                renderInput={(params) => <TextField {...params} name="department" label="Department" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Position" {...fieldProps("position")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Basic Salary (monthly)" type="number" {...fieldProps("basicSalary")} InputProps={{ inputProps: { min: 0 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="EPF Number" {...fieldProps("epfNo")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Bank Account" {...fieldProps("bankAccount")} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" multiline minRows={2} {...fieldProps("address")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Hire Date" type="date" InputLabelProps={{ shrink: true }} {...fieldProps("hireDate")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Status" {...fieldProps("status")}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="terminated">Terminated</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="New password (optional)" type="password" autoComplete="new-password" {...fieldProps("password")} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, color: "var(--text-muted)" }}>
                Gender
              </Typography>
              <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button type="submit" variant="contained" size="large" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Update Employee"}
                </Button>
                <Button size="large" color="inherit" onClick={() => navigate("/hr/employees")}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

const EmployeeUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  return (
    <>
      <PageHeader title="Update Employee" subtitle={employee ? `Editing ${employee.name}` : "Update an employee"} />
      {!employee ? (
        <Card>
          <EmptyState
            icon={ErrorOutlineIcon}
            title="No employee selected"
            description="Please open this page from the Employee Information table using the Edit action."
            action={
              <Button variant="contained" onClick={() => navigate("/hr/employees")}>
                Back to employees
              </Button>
            }
          />
        </Card>
      ) : (
        <EmployeeUpdateForm employee={employee} id={id} />
      )}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default EmployeeUpdate;
