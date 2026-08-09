import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Chip, MenuItem, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import PayslipPdf from "../../components/employee/PayslipPdf";
import { formatMoney } from "../../components/ui/StatCard";

const PayrollSummary = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (period) params.period = period;
      if (status) params.status = status;
      const res = await axios.get("/payrolls/", { params });
      setRows(res.data.map((p) => ({ ...p, id: p._id })));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [period, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/payrolls/${toDelete}`);
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
      { field: "period", headerName: "Period", width: 105, renderCell: (p) => <strong>{p.value}</strong> },
      { field: "employeeName", headerName: "Employee", width: 190, renderCell: (p) => <strong>{p.value}</strong> },
      { field: "empId", headerName: "ID", width: 85, renderCell: (p) => p.row.employee?.employeeId || "—" },
      { field: "basicSalary", headerName: "Basic", width: 115, renderCell: (p) => formatMoney(p.value) },
      { field: "totalEarnings", headerName: "Total Earnings", width: 130, renderCell: (p) => formatMoney(p.value) },
      { field: "totalDeduction", headerName: "Deductions", width: 125, renderCell: (p) => formatMoney(p.value) },
      { field: "netPay", headerName: "Net Pay", width: 125, renderCell: (p) => <strong>{formatMoney(p.value)}</strong> },
      {
        field: "status",
        headerName: "Status",
        width: 105,
        renderCell: (p) => <Chip label={p.value} size="small" color={p.value === "paid" ? "success" : "warning"} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 210,
        sortable: false,
        filterable: false,
        renderCell: (p) => (
          <>
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/hr/payroll/${p.id}`, { state: { Payroll: rows.find((r) => r.id === p.id) } })}>
              Edit
            </Button>
            <Button size="small" color="error" startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => setToDelete(p.id)}>
              Delete
            </Button>
            <PDFDownloadLink document={<PayslipPdf payroll={p.row} />} fileName={`payslip-${p.row.employeeName}-${p.row.period}.pdf`} style={{ textDecoration: "none" }}>
              {({ loading }) => (
                <Button size="small" startIcon={<DownloadIcon />} disabled={loading}>
                  PDF
                </Button>
              )}
            </PDFDownloadLink>
          </>
        ),
      },
    ],
    [navigate, rows]
  );

  return (
    <>
      <PageHeader
        title="Payroll Summary"
        subtitle="All generated pay slips, one per employee per month"
        actions={
          <>
            <TextField
              type="month"
              size="small"
              label="Period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150 }}
            />
            <TextField select size="small" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 130 }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </TextField>
          </>
        }
      />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(r) => r.id}
        searchKeys={["employeeName", "period"]}
        searchPlaceholder="Search by employee or period..."
        emptyIcon={ReceiptLongIcon}
        emptyTitle="No pay slips found"
        emptyDescription="Generate pay slips from the Payroll Entry page."
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete pay slip"
        message="Are you sure you want to delete this pay slip? This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      />
    </>
  );
};

export default PayrollSummary;
