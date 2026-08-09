import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import ProductionForm from "../../components/production/ProductionForm";
import { ToastContainer } from "react-toastify";

const ProductionAdd = () => (
  <Box>
    <PageHeader title="Create Production" subtitle="Register a new production batch" />
    <ProductionForm mode="create" />
    <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
  </Box>
);

export default ProductionAdd;
