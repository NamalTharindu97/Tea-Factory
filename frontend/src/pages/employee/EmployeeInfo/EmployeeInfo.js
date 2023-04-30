import React, { useEffect, useState } from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import "./employeeInfo.scss";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "gender", headerName: "Gender", width: 200 },
  { field: "age", headerName: "Age", width: 200 },
  { field: "role", headerName: "Role", width: 200 },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
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
          <DataGrid rows={empData} columns={columns} paginationModel={{ page: 0, pageSize: 25 }} />
        </div>
      </div>
    </div>
  );
};
