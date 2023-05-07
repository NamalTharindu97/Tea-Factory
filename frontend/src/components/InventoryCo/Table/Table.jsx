import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, TrackingID, Date, status) {
  return { name, TrackingID, Date, status };
}

const rows = [
  createData("Name", 564646, "2 March 2023", "Approved"),
  createData("Name", 564646, "2 March 2023", "Pending"),
  createData("Name", 564646, "2 March 2023", "Approved"),
  createData("Name", 564646, "2 March 2023", "Approved"),
  createData("Name", 564646, "2 March 2023", "Pending"),
  createData("Name", 564646, "2 March 2023", "Approved"),
];

const makeStyles = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/tea-factory/inventory/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="Table">
      <h3>Inventories</h3>

      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">inTime</TableCell>
              <TableCell align="left">outTime</TableCell>
              <TableCell align="left">Supplier Name</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left">{item.location}</TableCell>
                <TableCell align="left">{item.inTime}</TableCell>
                <TableCell align="left" className="details">
                  {item.outTime}
                </TableCell>
                <TableCell align="left">{item.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
