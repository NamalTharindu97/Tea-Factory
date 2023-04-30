import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.scss";
import { green } from "@mui/material/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  role: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  password: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
});

const roles = ["HR Manager", "Inventory Manager", "Supplier Manager", "Production Manager"];

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: green["A400"],
    },
  },
});

export const Profile = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "male",
      age: "",
      role: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/employees/", {
          name: values.name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          age: values.age,
          role: values.role,
          password: values.password,
        });
        if (!response) {
          console.log("employee not created");
        } else {
          toast.success("Employee Created!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Try again", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
  });

  return (
    <div className="profile">
      <ThemeProvider theme={theme}>
        <form className="profile-form" onSubmit={formik.handleSubmit}>
          <p className="head-tag-1">create user</p>
          <p className="head-tag-2">Create a New User Profile</p>
          <TextField
            color="primary"
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ marginBottom: "1rem" }}
          />
          <FormControl component="fieldset" sx={{ marginBottom: "1rem" }}>
            <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            sx={{ marginBottom: "1rem" }}
          />
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" label="Role" name="role" value={formik.values.role} onChange={formik.handleChange} error={formik.touched.role && Boolean(formik.errors.role)}>
              {roles.map((role) => (
                <MenuItem className="menu" key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: "1rem" }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" className="profile-btn" sx={{ marginBottom: "1rem" }}>
            Submit
          </Button>
          <ToastContainer position="top-center" autoClose={3000} limit={1} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </form>
      </ThemeProvider>
    </div>
  );
};
