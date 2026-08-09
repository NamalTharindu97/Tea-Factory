import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const Suppliers = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/supliers/");
      setRows(res.data.map((s) => ({ ...s, id: s._id })));
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
      await axios.delete(`/supliers/${toDelete}`);
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
      { field: "name", headerName: "Name", width: 180, renderCell: (p) => <strong>{p.value}</strong> },
      { field: "item", headerName: "Supplied Item", width: 160 },
      { field: "phone", headerName: "Phone", width: 140 },
      { field: "email", headerName: "Email", width: 220 },
      { field: "address", headerName: "Address", width: 220 },
      { field: "bank", headerName: "Bank", width: 140 },
      { field: "bankNo", headerName: "Account No.", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        sortable: false,
        filterable: false,
        renderCell: (p) => (
          <>
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/SupplierAdminPanal/EditSupplier/${p.id}`, { state: { supplier: rows.find((r) => r.id === p.id) } })}>
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
      <PageHeader title="Suppliers" subtitle="Manage tea suppliers" />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(r) => r.id}
        searchKeys={["name", "item", "email", "bank"]}
        searchPlaceholder="Search by name, item, email or bank..."
        emptyIcon={LocalShippingIcon}
        emptyTitle="No suppliers found"
        emptyDescription="Add suppliers from the Add Supplier page."
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete supplier"
        message="Are you sure you want to delete this supplier? This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      />
    </>
  );
};

export default Suppliers;
