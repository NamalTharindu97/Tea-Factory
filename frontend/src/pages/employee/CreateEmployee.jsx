import React, { useRef, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField, Autocomplete, RadioGroup, FormControlLabel, Radio, Typography, IconButton, Avatar, CircularProgress } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";

const ROLES = ["HR Manager", "Inventory Manager", "Suplier Manager", "Production Manager", "HR Assistant", "Inventory Clerk", "Production Worker", "Quality Inspector"];
const DEPARTMENTS = ["General", "Production", "Warehouse", "Quality", "Administration", "Finance"];

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      nic: "",
      gender: "male",
      age: "",
      role: "",
      department: "General",
      position: "",
      basicSalary: "",
      epfNo: "",
      bankAccount: "",
      address: "",
      hireDate: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      age: Yup.number().min(16, "Must be at least 16").max(90, "Must be at most 90").required("Age is required"),
      role: Yup.string().required("Role is required"),
      basicSalary: Yup.number().min(0, "Cannot be negative"),
      password: Yup.string().max(20, "Must be 20 characters or less").min(6, "Must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      let imageUrl = preview || DEFAULT_AVATAR;
      setUploading(true);
      try {
        if (fileRef.current?.files?.[0]) {
          const data = new FormData();
          data.append("file", fileRef.current.files[0]);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/namal97/image/upload", data);
          imageUrl = uploadRes.data.url || DEFAULT_AVATAR;
        }
        await axios.post("/employees/", { ...values, img: imageUrl, basicSalary: Number(values.basicSalary) || 0 });
        toast.success("Employee created!");
        setTimeout(() => navigate("/hr/employees"), 1200);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to create employee.");
      } finally {
        setUploading(false);
        setSubmitting(false);
      }
    },
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
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
      <PageHeader title="Create Employee" subtitle="Add a new employee to the system (a unique Employee ID is generated automatically)" />
      <Card sx={{ maxWidth: 900 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Avatar src={preview || DEFAULT_AVATAR} sx={{ width: 88, height: 88 }} />
            <Box>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} id="profile-photo-input" />
              <label htmlFor="profile-photo-input">
                <IconButton component="span" sx={{ border: "1px solid var(--border)", color: "var(--primary)", mr: 1 }}>
                  <PhotoCameraIcon />
                </IconButton>
              </label>
              <Typography variant="body2" color="text.secondary">
                Upload a profile photo (optional)
              </Typography>
            </Box>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Full Name" {...fieldProps("name")} />
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
                <TextField label="Password" type="password" autoComplete="new-password" {...fieldProps("password")} />
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
                <Button type="submit" variant="contained" size="large" disabled={formik.isSubmitting || uploading} sx={{ mt: 1 }}>
                  {formik.isSubmitting || uploading ? <CircularProgress size={22} color="inherit" /> : "Create Employee"}
                </Button>
                <Button size="large" color="inherit" sx={{ mt: 1 }} onClick={() => navigate("/hr/employees")}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default CreateEmployee;
