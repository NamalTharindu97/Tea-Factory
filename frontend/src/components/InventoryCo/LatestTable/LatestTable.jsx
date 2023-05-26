import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./LatestTable.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFfile from "../../Pdffile/PDFfile";

export default function BasicTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/v1/tea-factory/inventory/")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          // Assuming a timestamp field named "timestamp"
          return new Date(a.timestamp) - new Date(b.timestamp);
        });
        setData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const limitedData = data.slice(Math.max(data.length - 4, 0)); // Limit the data to the last 5 records

  return (
    <div className="Table">
      <h3>Latest Inventories</h3>

      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">inTime</TableCell>
              <TableCell align="left">outTime</TableCell>
              <TableCell align="left">Supplier Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {limitedData
              .filter((item) => {
                const lowercaseSearch = search.toLowerCase();
                return (
                  lowercaseSearch === "" ||
                  item.Id.toLowerCase().includes(lowercaseSearch) ||
                  item.name.toLowerCase().includes(lowercaseSearch) ||
                  item.location.toLowerCase().includes(lowercaseSearch)
                );
              })
              .map((item) => (
                <TableRow key={item.Id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{item.Id}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">{item.location}</TableCell>
                  <TableCell align="left">{item.inTime}</TableCell>
                  <TableCell align="left">{item.outTime}</TableCell>
                  <TableCell align="left">{item.supplier}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
