import React, { useEffect, useState } from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DeleteConfirmBtn } from "../../../components/EmployeCo/DeleteConfirmBtn/DeleteConfirmBtn";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, createTheme } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import "./payrollSummery.scss";
import { motion } from "framer-motion";
import { scaleVariantForm } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const PayrollSummery = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: green["A400"],
      },
    },
  });

  const columns = [
    { field: "empName", headerName: "Name", width: 180, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "empId", headerName: "ID", width: 180, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "basicSalary", headerName: "Basic Salary", width: 150, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "totoalEarnings", headerName: "Total Earings", width: 150, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "totalDeduction", headerName: "Total Deduction", width: 180, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "netPay", headerName: "Net Pay", width: 180, headerClassName: "custom-header", cellClassName: "custom-cell" },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <button className="update-button" onClick={() => handleUpdate(params)}>
          Update
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => <DeleteConfirmBtn id={params.id} type="payroll" />,
    },
  ];

  useEffect(() => {
    const getPayroll = async () => {
      try {
        const response = await axios.get("/payrolls/");
        setPayrollData(response.data.map((emp) => ({ ...emp, id: emp._id })));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPayroll();
  }, []);

  const handleUpdate = (params) => {
    const rowId = params.id; // get the MongoDB _id field
    const Payroll = payrollData.find((emp) => emp.id === rowId);
    navigate(`/EmployeeAdminPanal/PayrollSummery/PayRollUpdateForm/${rowId}`, { state: { Payroll } });
  };

  return (
    <div className="PayrollSummery">
      <SideBar />
      <div className="payroll-summery-inner">
        <NavBar />
        <div>
          {loading ? (
            <div className="spinner">
              <ThemeProvider theme={theme}>
                <CircularProgress color="primary" />
              </ThemeProvider>
            </div>
          ) : (
            <motion.div className="data-grid" variants={scaleVariantForm} initial="initial" animate="animate">
              <DataGrid rows={payrollData} columns={columns} paginationModel={{ page: 0, pageSize: 25 }} hideFooterPagination hideFooterSelectedRowCount className="grid" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
