import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import InventoryReportPdf from "../../components/inventory/InventoryReportPdf";
import { formatNumber } from "../../components/ui/StatCard";
import { ToastContainer } from "react-toastify";

const ViewInventory = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/inventory/");
      setRows(res.data.map((item) => ({ ...item, id: item._id })));
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
      await axios.delete(`/inventory/${toDelete}`);
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
      { field: "Id", headerName: "ID", width: 120, renderCell: (p) => <strong>{p.value}</strong> },
      { field: "name", headerName: "Name", width: 200 },
      { field: "quantity", headerName: "Quantity", width: 120, renderCell: (p) => formatNumber(p.value) },
      { field: "location", headerName: "Location", width: 150 },
      { field: "inTime", headerName: "In Time", width: 130 },
      { field: "outTime", headerName: "Out Time", width: 130 },
      { field: "supplier", headerName: "Supplier", width: 160 },
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        sortable: false,
        filterable: false,
        renderCell: (p) => (
          <>
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/updateInventory/${p.id}`, { state: { inventory: rows.find((r) => r.id === p.id) } })}>
              Update
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

  const pdfButton = (
    <PDFDownloadLink document={<InventoryReportPdf data={rows} />} fileName="inventory_report.pdf" style={{ textDecoration: "none" }}>
      {({ loading: pdfLoading }) => (
        <Button variant="outlined" startIcon={<DownloadIcon />} disabled={pdfLoading || rows.length === 0}>
          {pdfLoading ? "Preparing..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );

  return (
    <>
      <PageHeader title="View Inventory" subtitle="All inventory items" actions={pdfButton} />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(r) => r.id}
        searchKeys={["Id", "name", "location", "supplier"]}
        searchPlaceholder="Search by ID, name, location or supplier..."
        emptyIcon={Inventory2Icon}
        emptyTitle="No inventory items"
        emptyDescription="Add inventory items from the Add Inventory page."
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete inventory item"
        message="Are you sure you want to delete this inventory item? This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      />
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default ViewInventory;
