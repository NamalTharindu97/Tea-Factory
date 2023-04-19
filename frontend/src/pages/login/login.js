import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import "./login.css";

function LoginForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("User name is required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Password is required"),
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
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} onSubmit={formik.handleSubmit}>
      <label>
        {/* Username */}
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
      </label>
      <br />
      <label>
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
      </label>
      <br />
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit" disabled={formik.isSubmitting}>
        Submit
      </motion.button>
    </motion.form>
  );
}

export default LoginForm;
