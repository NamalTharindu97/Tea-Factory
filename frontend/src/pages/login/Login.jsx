import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, InputAdornment, IconButton, Typography, CircularProgress, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROLE_HOME, normalizeRole, useAuth } from "../../context/AuthContext";
import logo from "../../asserts/EmployeAs/Img/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("Name is required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("/employees/login", { name: values.username, password: values.password });
        const accessToken = response.data.accessToken;
        window.localStorage.setItem("accessToken", accessToken);
        const decoded = jwt_decode(accessToken);
        setUser(decoded.user);
        const home = ROLE_HOME[normalizeRole(decoded.user.role)] || "/";
        navigate(home);
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid name or password", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          theme: "colored",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 2, md: 4 }, bgcolor: "var(--bg)" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 960,
          minHeight: { xs: "auto", md: 560 },
          bgcolor: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
        }}
      >
        {isDesktop ? (
          <Box
            sx={{
              flex: 1.15,
              p: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#fff",
              background: "linear-gradient(150deg, #115a31 0%, #1d7a46 55%, #2f9e44 100%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={logo} alt="Ambrosia Tea logo" style={{ width: 44, height: 44, objectFit: "cover" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  Ambrosia Tea
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>
                  Factory Management System
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2rem", lineHeight: 1.25, mb: 2 }}>
                Step into the world of tea and discover the essence of nature in every sip.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage employees, payroll, inventory, production and suppliers from one place.
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} Ambrosia Tea Co (Pvt) Ltd
            </Typography>
          </Box>
        ) : null}

        <Box sx={{ flex: 1, p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, justifyContent: isDesktop ? "flex-start" : "center" }}>
            <img src={logo} alt="Ambrosia Tea logo" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} />
            {!isDesktop ? (
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Ambrosia Tea
              </Typography>
            ) : null}
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Login to manage your account
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              label="Name or Employee ID"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" size="large" startIcon={<LoginSharpIcon />} disabled={formik.isSubmitting} sx={{ mt: 1 }}>
              {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer position="top-center" autoClose={2500} limit={1} hideProgressBar closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default LoginPage;
