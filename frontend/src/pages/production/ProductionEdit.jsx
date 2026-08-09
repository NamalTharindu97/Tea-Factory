import React from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ProductionForm from "../../components/production/ProductionForm";
import { ToastContainer } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";

const ProductionEdit = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  return (
    <Box>
      <PageHeader title="Edit Production" subtitle={product ? `Editing ${product.ProdutionID}` : "Edit a production record"} />
      {!product ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Box sx={{ maxWidth: 520, width: "100%" }}>
            <EmptyState icon={ErrorOutlineIcon} title="No production selected" description="Please open this page from the All Productions table using the Edit action." />
          </Box>
        </Box>
      ) : (
        <ProductionForm mode="update" id={id} initial={product} />
      )}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default ProductionEdit;
