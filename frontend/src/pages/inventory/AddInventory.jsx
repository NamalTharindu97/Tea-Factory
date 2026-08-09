import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import InventoryForm from "../../components/inventory/InventoryForm";
import { ToastContainer } from "react-toastify";

const AddInventory = () => (
  <Box>
    <PageHeader title="Add Inventory" subtitle="Register a new inventory item" />
    <InventoryForm mode="create" />
    <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
  </Box>
);

export default AddInventory;
