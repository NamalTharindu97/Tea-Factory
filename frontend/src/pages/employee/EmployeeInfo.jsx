import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Chip, MenuItem, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { DEFAULT_AVATAR } from "../../config/constants";

const roleColor = (role) => {
  if (role?.includes("HR")) return "primary";
  if (role?.includes("Inventory")) return "success";
  if (role?.includes("Production")) return "warning";
  return "info";
};

const EmployeeInfo = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("active");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/employees/", { params: status ? { status } : {} });
      setRows(res.data.map((emp) => ({ ...emp, id: emp._id })));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/employees/${toDelete}`);
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
      { field: "employeeId", headerName: "ID", width: 90, renderCell: (p) => <strong>{p.value}</strong> },
      {
        field: "name",
        headerName: "Name",
        width: 240,
        renderCell: (p) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Avatar src={p.row.img || DEFAULT_AVATAR} alt={p.value} sx={{ width: 34, height: 34, bgcolor: "var(--primary-soft)", color: "var(--primary)", fontSize: "0.8rem" }}>
              {p.value ? p.value.charAt(0).toUpperCase() : ""}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.value}
            </Typography>
          </Box>
        ),
      },
      { field: "email", headerName: "Email", width: 220 },
      { field: "phone", headerName: "Phone", width: 130 },
      { field: "department", headerName: "Department", width: 130 },
      { field: "position", headerName: "Position", width: 160 },
      { field: "role", headerName: "Role", width: 165, renderCell: (p) => <Chip label={p.value} size="small" color={roleColor(p.value)} variant="outlined" /> },
      {
        field: "status",
        headerName: "Status",
        width: 110,
        renderCell: (p) => <Chip label={p.value} size="small" color={p.value === "active" ? "success" : "default"} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (p) => (
          <>
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/hr/employees/${p.id}`, { state: { employee: rows.find((r) => r.id === p.id) } })}>
              Edit
            </Button>
            <Button size="small" color="error" startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => setToDelete(p.id)} disabled={p.row.status === "terminated"}>
              Deactivate
            </Button>
          </>
        ),
      },
    ],
    [navigate, rows]
  );

  return (
    <>
      <PageHeader
        title="Employee Information"
        subtitle="Search, update and manage all employees"
        actions={
          <TextField
            select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 140 }}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="terminated">Terminated</MenuItem>
            <MenuItem value="">All</MenuItem>
          </TextField>
        }
      />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(r) => r.id}
        searchKeys={["employeeId", "name", "email", "phone", "position", "role", "department"]}
        searchPlaceholder="Search by ID, name, email, role..."
        emptyIcon={PeopleIcon}
        emptyTitle="No employees found"
        emptyDescription="Create your first employee from the Employee Management menu."
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Deactivate employee"
        message="Deactivating marks this employee as terminated and hides them from active lists. Their payroll history is kept. Continue?"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      />
    </>
  );
};

export default EmployeeInfo;
