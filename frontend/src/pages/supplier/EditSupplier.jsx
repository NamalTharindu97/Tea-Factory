import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import SupplierForm from "../../components/supplier/SupplierForm";
import EmptyState from "../../components/ui/EmptyState";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ToastContainer } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";

const EditSupplier = () => {
  const { id } = useParams();
  const location = useLocation();
  const supplier = location.state?.supplier;

  return (
    <Box>
      <PageHeader title="Edit Supplier" subtitle={supplier ? `Editing ${supplier.name}` : "Edit a supplier"} />
      {!supplier ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Box sx={{ maxWidth: 520, width: "100%" }}>
            <EmptyState icon={ErrorOutlineIcon} title="No supplier selected" description="Please open this page from the Suppliers table using the Edit action." />
          </Box>
        </Box>
      ) : (
        <SupplierForm mode="update" id={id} initial={supplier} />
      )}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default EditSupplier;
