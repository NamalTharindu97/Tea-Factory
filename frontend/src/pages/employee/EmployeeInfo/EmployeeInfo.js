import React from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import "./employeeInfo.scss";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 400,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
];

export const EmployeeInfo = () => {
  return (
    <div className="EmployeeInfo">
      <SideBar />
      <div className="info-container">
        <NavBar />
        <div className="data-grid">
          <DataGrid rows={rows} columns={columns} paginationModel={{ page: 0, pageSize: 25 }} style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};
