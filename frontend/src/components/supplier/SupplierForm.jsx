import React from "react";
import { Card, CardContent, Grid, TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  name: Yup.string().required("Please enter the supplier name"),
  item: Yup.string().required("Please enter the supplied item"),
  address: Yup.string().required("Please enter the address"),
  phone: Yup.string().required("Please enter the phone number"),
  email: Yup.string().email("Invalid email address").required("Please enter the email"),
  bank: Yup.string().required("Please enter the bank"),
  bankNo: Yup.string().required("Please enter the bank account number"),
});

export const SupplierForm = ({ mode = "create", id, initial }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: initial?.name || "",
      item: initial?.item || "",
      address: initial?.address || "",
      phone: initial?.phone || "",
      email: initial?.email || "",
      bank: initial?.bank || "",
      bankNo: initial?.bankNo || "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (mode === "update") {
          await axios.put(`/supliers/${id}`, values);
          toast.success("Supplier updated!");
          setTimeout(() => navigate("/SupplierAdminPanal/Suppliers"), 1200);
        } else {
          await axios.post("/supliers/", values);
          toast.success("Supplier added!");
          resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to save supplier.");
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
    <Card sx={{ maxWidth: 880 }}>
      <CardContent sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Supplier Name" {...fieldProps("name")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Supplied Item" {...fieldProps("item")} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" {...fieldProps("address")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" {...fieldProps("phone")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" {...fieldProps("email")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Bank" {...fieldProps("bank")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Bank Account No." {...fieldProps("bankNo")} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" disabled={formik.isSubmitting} sx={{ mt: 1 }}>
                {formik.isSubmitting ? <CircularProgress size={25} color="inherit" /> : mode === "update" ? "Update Supplier" : "Add Supplier"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupplierForm;
