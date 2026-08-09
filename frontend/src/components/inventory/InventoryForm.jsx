import React from "react";
import { Card, CardContent, Grid, TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  Id: Yup.string().required("Please enter the inventory ID"),
  name: Yup.string().required("Please enter the inventory name"),
  description: Yup.string(),
  quantity: Yup.number().min(0, "Quantity cannot be negative").required("Please enter the quantity"),
  location: Yup.string().required("Please enter the location"),
  inTime: Yup.string().required("Please enter the in time"),
  outTime: Yup.string(),
  supplier: Yup.string().required("Please enter the supplier"),
});

export const InventoryForm = ({ mode = "create", id, initial }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Id: initial?.Id || "",
      name: initial?.name || "",
      description: initial?.description || "",
      quantity: initial?.quantity ?? "",
      location: initial?.location || "",
      inTime: initial?.inTime || "",
      outTime: initial?.outTime || "",
      supplier: initial?.supplier || "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (mode === "update") {
          await axios.put(`/inventory/${id}`, values);
          toast.success("Inventory updated!");
          setTimeout(() => navigate("/viewInventory"), 1200);
        } else {
          await axios.post("/inventory/", values);
          toast.success("Inventory item added!");
          resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to save inventory item.");
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
              <TextField label="Inventory ID" {...fieldProps("Id")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" {...fieldProps("name")} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" multiline rows={3} {...fieldProps("description")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Quantity" type="number" {...fieldProps("quantity")} InputProps={{ inputProps: { min: 0 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Location" {...fieldProps("location")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="In Time" type="time" {...fieldProps("inTime")} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Out Time" type="time" {...fieldProps("outTime")} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Supplier" {...fieldProps("supplier")} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" disabled={formik.isSubmitting} sx={{ mt: 1 }}>
                {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : mode === "update" ? "Update Inventory" : "Add Inventory"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default InventoryForm;
