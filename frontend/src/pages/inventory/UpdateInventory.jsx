import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import InventoryForm from "../../components/inventory/InventoryForm";
import EmptyState from "../../components/ui/EmptyState";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ToastContainer } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";

const UpdateInventory = () => {
  const { id } = useParams();
  const location = useLocation();
  const inventory = location.state?.inventory;

  return (
    <Box>
      <PageHeader title="Update Inventory" subtitle={inventory ? `Editing ${inventory.name}` : "Update an inventory item"} />
      {!inventory ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Box sx={{ maxWidth: 520, width: "100%" }}>
            <EmptyState icon={ErrorOutlineIcon} title="No inventory item selected" description="Please open this page from the View Inventory table using the Update action." />
          </Box>
        </Box>
      ) : (
        <InventoryForm mode="update" id={id} initial={inventory} />
      )}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default UpdateInventory;
