import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import "./login.css";
import logo from "../../asserts/EmployeAs/Img/logo.png";

function LoginForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/tea-factory/employees/login", {
          name: values.username,
          password: values.password,
        });
        const accessToken = response.data.accessToken;
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.user.role === "HR Manager") {
          navigate("/EmployeeAdminPanal");
          console.log("Navigate to EmpAdminPanel");
          // Navigate to EmployeeAdminPanal
        } else if (decodedToken.user.role === "Inventory Manager") {
          // Navigate to InventoryAdminPanal
          navigate("/InventoryAdminPanal");
          console.log("Navigate to InventoryAdminPanel");
        } else if (decodedToken.user.role === "Suplier Manager") {
          // Navigate to SupplierAdminPanal
          navigate("/SupplierAdminPanal");
          console.log("Navigate to Suplier AdminPanel");
        } else if (decodedToken.user.role === "Production Manager") {
          // Navigate to ProductionAdminPanal
          navigate("/ProductionAdminPanal");
          console.log("Navigate to Production AdminPanel");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="containter">
      <div className="container-inner">
        <div className="log-photo"></div>
        <motion.form initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "tween", duration: 1.2 }} onSubmit={formik.handleSubmit}>
          <div className="upper-section">
            <div className="logo">
              <img src={logo} alt="logo" width="180" height="100" />
            </div>
            <div className="heading-1">
              <p>Wellcome Back</p>
            </div>
          </div>
          <div className="heading-2">
            <p>Login To Manage Your Account</p>
          </div>
          <motion.input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Name Here"
            className={formik.touched.username && formik.errors.username ? "error-input" : ""}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          {formik.touched.username && formik.errors.username ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="error">
              {formik.errors.username}
            </motion.div>
          ) : null}

          <br />

          {/* Password */}
          <motion.input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Password Here"
            className={formik.touched.password && formik.errors.password ? "error-input" : ""}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          {formik.touched.password && formik.errors.password ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="error">
              {formik.errors.password}
            </motion.div>
          ) : null}

          <br />
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit" disabled={formik.isSubmitting}>
            Submit
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

export default LoginForm;
