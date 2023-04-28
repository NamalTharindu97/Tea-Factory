import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import "./login.css";
import logo from "../../asserts/EmployeAs/Img/logo.png";
import { containerVarients, svgVarients, buttonVariants, textVarients, buttonVariants2 } from "./login-motion";

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
    <div className="login">
      <motion.div className="container-inner" variants={containerVarients} initial="hidden" animate="visible">
        <motion.div className="log-photo">
          <motion.div className="login-text" variants={textVarients} initial="hidden" animate="visible">
            <div>Step into the world</div>
            <div>of tea</div>
            <div>and</div>
            <div>discover the essence</div>
            <div>of nature in </div>
            <div> every sip</div>
          </motion.div>
        </motion.div>
        <motion.form onSubmit={formik.handleSubmit}>
          <div className="upper-section">
            <motion.div className="logo" variants={svgVarients} initial="hidden" animate="visible">
              <img src={logo} alt="logo" width="180" height="100" />
            </motion.div>
            <motion.div className="heading-1" variants={buttonVariants} whileHover="hover" initial="btnHidden" animate="btnVisible">
              <p>Wellcome Back</p>
            </motion.div>
          </div>
          <motion.div className="heading-2" variants={buttonVariants} whileHover="hover" initial="btnHidden" animate="btnVisible">
            <p>Login To Manage Your Account</p>
          </motion.div>
          <motion.input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Name Here"
            className={formik.touched.username && formik.errors.username ? "error-input" : ""}
            variants={buttonVariants2}
            whileHover="hover"
            initial="btnHidden"
            animate="btnVisible"
            whileTap="tap"
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
            variants={buttonVariants2}
            whileHover="hover"
            initial="btnHidden"
            animate="btnVisible"
            whileTap="tap"
          />
          {formik.touched.password && formik.errors.password ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="error">
              {formik.errors.password}
            </motion.div>
          ) : null}

          <br />
          <motion.button variants={buttonVariants2} whileHover="hover" initial="btnHidden" animate="btnVisible" type="submit" disabled={formik.isSubmitting}>
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default LoginForm;
