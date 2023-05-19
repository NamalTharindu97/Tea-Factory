import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/v1/tea-factory/inventory/")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/tea-factory/inventory/${id}`)
      .then(() => {
        console.log("Item deleted successfully");
        fetchData(); // Fetch updated data after delete
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleUpdate = (id) => {
    // Implement your update logic here
    console.log("Item to update:", id);
  };

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
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left">{item.location}</TableCell>
                <TableCell align="left">{item.inTime}</TableCell>
                <TableCell align="left">{item.outTime}</TableCell>
                <TableCell align="left">{item.supplier}</TableCell>
                <TableCell align="left">
                  <button onClick={() => handleUpdate(item.id)}>Update</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
