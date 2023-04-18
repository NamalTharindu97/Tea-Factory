import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
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
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
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
        // Here you can handle the error, such as displaying an error message to the user
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        {/* Username */}
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Name Here"
          className={formik.touched.username && formik.errors.username ? "error-input" : ""}
        />
        {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
      </label>
      <br />
      <label>
        {/* Password */}
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Password Here"
          className={formik.touched.password && formik.errors.password ? "error-input" : ""}
        />
        {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
      </label>
      <br />
      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
