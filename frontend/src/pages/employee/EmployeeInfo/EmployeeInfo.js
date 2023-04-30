import React, { useEffect, useState } from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import "./employeeInfo.scss";
import axios from "axios";

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
    renderCell: () => <button className="update-button">Update</button>,
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 100,
    headerClassName: "custom-header",
    cellClassName: "custom-cell",
    renderCell: () => <button className="delete-button">Delete</button>,
  },
];

export const EmployeeInfo = () => {
  const [empData, setEmpData] = useState([]);

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
