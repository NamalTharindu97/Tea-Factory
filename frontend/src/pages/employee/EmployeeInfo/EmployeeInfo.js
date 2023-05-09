import React, { useEffect, useState } from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DeleteConfirmBtn } from "../../../components/EmployeCo/DeleteConfirmBtn/DeleteConfirmBtn";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, createTheme } from "@mui/material";
import "./employeeInfo.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { motion } from "framer-motion";
import { scaleVariantForm } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const EmployeeInfo = () => {
  const [empData, setEmpData] = useState([]);
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
    { field: "name", headerName: "Name", width: 220, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "email", headerName: "Email", width: 250, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "phone", headerName: "Phone", width: 150, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "gender", headerName: "Gender", width: 100, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "age", headerName: "Age", width: 100, headerClassName: "custom-header", cellClassName: "custom-cell" },
    { field: "role", headerName: "Role", width: 180, headerClassName: "custom-header", cellClassName: "custom-cell" },
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
      renderCell: (params) => <DeleteConfirmBtn id={params.id} />,
    },
  ];

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get("/employees/");
        setEmpData(response.data.map((emp) => ({ ...emp, id: emp._id })));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, []);

  const handleUpdate = (params) => {
    const rowId = params.id; // get the MongoDB _id field
    const employee = empData.find((emp) => emp.id === rowId);
    navigate(`/EmployeeAdminPanal/EmployeeInfo/Employee/${rowId}`, { state: { employee } });
  };

  return (
    <div className="EmployeeInfo">
      <SideBar />
      <div className="info-container">
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
              <DataGrid rows={empData} columns={columns} paginationModel={{ page: 0, pageSize: 25 }} hideFooterPagination hideFooterSelectedRowCount className="grid" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
