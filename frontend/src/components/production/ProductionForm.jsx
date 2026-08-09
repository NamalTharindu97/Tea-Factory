import React from "react";
import { Card, CardContent, Grid, TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const STATUS = ["Pending", "In Progress", "Completed", "Cancelled"];

const schema = Yup.object({
  ProdutionID: Yup.string().required("Please enter the production ID"),
  description: Yup.string().required("Please enter the description"),
  startDate: Yup.string().required("Please enter the start date"),
  endDate: Yup.string().required("Please enter the end date"),
  status: Yup.string().required("Please select the status"),
  teaType: Yup.string().required("Please enter the tea type"),
  batchNumber: Yup.string().required("Please enter the batch number"),
});

export const ProductionForm = ({ mode = "create", id, initial }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ProdutionID: initial?.ProdutionID || "",
      description: initial?.description || "",
      startDate: initial?.startDate || "",
      endDate: initial?.endDate || "",
      status: initial?.status || "Pending",
      teaType: initial?.teaType || "",
      batchNumber: initial?.batchNumber || "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (mode === "update") {
          await axios.put(`/productions/${id}`, values);
          toast.success("Production updated!");
        } else {
          await axios.post("/productions/", values);
          toast.success("Production created!");
        }
        setTimeout(() => navigate("/ProductionAdminPanal/ProductionList"), 1200);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to save production record.");
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
    <Card sx={{ maxWidth: 860 }}>
      <CardContent sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Production ID" {...fieldProps("ProdutionID")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Batch Number" {...fieldProps("batchNumber")} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" multiline rows={3} {...fieldProps("description")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Start Date" type="date" {...fieldProps("startDate")} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="End Date" type="date" {...fieldProps("endDate")} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tea Type" {...fieldProps("teaType")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Status" {...fieldProps("status")}>
                {STATUS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" disabled={formik.isSubmitting} sx={{ mt: 1 }}>
                {formik.isSubmitting ? <CircularProgress size={25} color="inherit" /> : mode === "update" ? "Update Production" : "Create Production"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductionForm;
