import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import SupplierForm from "../../components/supplier/SupplierForm";
import { ToastContainer } from "react-toastify";

const AddSupplier = () => (
  <Box>
    <PageHeader title="Add Supplier" subtitle="Register a new tea supplier" />
    <SupplierForm mode="create" />
    <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
  </Box>
);

export default AddSupplier;
