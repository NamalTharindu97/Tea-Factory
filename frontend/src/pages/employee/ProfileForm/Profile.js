import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.scss";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { motion } from "framer-motion";
import { scaleVariantForm } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  role: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  password: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
});

const roles = ["HR Manager", "Inventory Manager", "Suplier Manager", "Production Manager"];

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
};

export const Profile = () => {
  const [file, setFile] = useState("");

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
    onSubmit: async (values, { resetForm }) => {
      if (!file) {
        toast.error("Please upload an image", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/namal97/image/upload", data);
        const { url } = uploadRes.data;
        const imageUrl = url ? url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

        const response = await axios.post("/employees/", {
          name: values.name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          img: imageUrl,
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
          resetForm(); //react formik method
        }
      } catch (error) {
        console.log(error);
        toast.error("User Name Already Taken", {
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
    <div className="profile-page">
      <SideBar />
      <div className="profile-container">
        <NavBar />
        <motion.div className="profile" variants={scaleVariantForm} initial="initial" animate="animate">
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
                sx={inputBaseStyles}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={inputBaseStyles}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={inputBaseStyles}
              />
              <FormControl
                component="fieldset"
                sx={{
                  marginBottom: "1rem",
                }}
              >
                <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                  <FormControlLabel value="male" control={<Radio />} label={<Typography sx={{ fontSize: "13px" }}>Male</Typography>} />
                  <FormControlLabel value="female" control={<Radio sx={{ fontSize: "13px" }} />} label={<Typography sx={{ fontSize: "13px" }}>Female</Typography>} />
                </RadioGroup>
              </FormControl>

              <IconButton color="primary" aria-label="upload picture" component="label" sx={inputBaseStyles}>
                <input hidden accept="image/*" type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                <PhotoCamera />
              </IconButton>

              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                sx={inputBaseStyles}
              />

              <FormControl fullWidth sx={inputBaseStyles}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select labelId="role-label" label="Role" name="role" value={formik.values.role} onChange={formik.handleChange} error={formik.touched.role && Boolean(formik.errors.role)}>
                  {roles.map((role) => (
                    <MenuItem className="menu" key={role} value={role} sx={{ fontSize: "13px" }}>
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
                sx={inputBaseStyles}
              />

              <Button color="primary" variant="contained" fullWidth type="submit" className="profile-btn" sx={{ marginBottom: "1rem" }}>
                CREATE USER
              </Button>
              <ToastContainer position="top-center" autoClose={3000} limit={1} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            </form>
          </ThemeProvider>
        </motion.div>
      </div>
    </div>
  );
};
