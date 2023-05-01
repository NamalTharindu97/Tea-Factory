import React, { useEffect, useState } from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import "./employeeInfo.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EmployeeInfo = () => {
  const [empData, setEmpData] = useState([]);
  const navigate = useNavigate();

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
      renderCell: (params) => (
        <button className="delete-button" onClick={() => handleDelete(params)}>
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get("/employees/");
        setEmpData(response.data.map((emp) => ({ ...emp, id: emp._id })));
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

  const handleDelete = async (params) => {
    const rowId = params.id; // get the MongoDB _id field
    try {
      const response = await axios.delete(`/employees/${rowId}`);
      if (!response) {
        console.log("not response from delete btn");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EmployeeInfo">
      <SideBar />
      <div className="info-container">
        <NavBar />
        <div className="data-grid">
          <DataGrid rows={empData} columns={columns} paginationModel={{ page: 0, pageSize: 25 }} hideFooterPagination hideFooterSelectedRowCount className="grid" />
        </div>
      </div>
    </div>
  );
};
