import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Chip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FactoryIcon from "@mui/icons-material/Factory";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { ToastContainer } from "react-toastify";

const statusColor = (status) => {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "warning";
  if (status === "Cancelled") return "error";
  return "default";
};

const ProductionList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/productions/");
      setRows(res.data.map((p) => ({ ...p, id: p._id })));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/productions/${toDelete}`);
      setToDelete(null);
      await fetchData();
    } catch {
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns = useMemo(
    () => [
      { field: "ProdutionID", headerName: "Production ID", width: 150, renderCell: (p) => <strong>{p.value}</strong> },
      { field: "description", headerName: "Description", width: 260 },
      { field: "teaType", headerName: "Tea Type", width: 130 },
      { field: "batchNumber", headerName: "Batch", width: 120 },
      { field: "startDate", headerName: "Start Date", width: 130 },
      { field: "endDate", headerName: "End Date", width: 130 },
      { field: "status", headerName: "Status", width: 140, renderCell: (p) => <Chip label={p.value} size="small" color={statusColor(p.value)} variant="outlined" /> },
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        sortable: false,
        filterable: false,
        renderCell: (p) => (
          <>
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/ProductionAdminPanal/ProductionList/ProductionForm/${p.id}`, { state: { product: rows.find((r) => r.id === p.id) } })}>
              Edit
            </Button>
            <Button size="small" color="error" startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => setToDelete(p.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    [navigate, rows]
  );

  return (
    <>
      <PageHeader title="All Productions" subtitle="Track and manage production batches" />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(r) => r.id}
        searchKeys={["ProdutionID", "description", "teaType", "batchNumber", "status"]}
        searchPlaceholder="Search by ID, description, tea type or batch..."
        emptyIcon={FactoryIcon}
        emptyTitle="No productions found"
        emptyDescription="Create a production batch from the Create Production page."
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete production"
        message="Are you sure you want to delete this production record? This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      />
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default ProductionList;
