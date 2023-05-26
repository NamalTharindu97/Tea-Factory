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
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFfile from "../../Pdffile/PDFfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (_id) => {
    console.log("Deleting item with _id:", _id);

    // Show confirmation dialog
    toast.warn(
      "Are you sure you want to delete this item?",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: (
          <div className="CnftoastContainer">
            <button
              className="delete-confirm"
              onClick={() => {
                deleteItem(_id);
              }}
            >
              Confirm
            </button>
            <button
              className="delete-cancel"
              onClick={() => {
                toast.dismiss();
              }}
            >
              Cancel
            </button>
          </div>
        )
      }
    );
  };

  const deleteItem = (_id) => {
    axios
      .delete(`http://localhost:5000/api/v1/tea-factory/inventory/${_id}`)
      .then(() => {
        console.log("Item deleted successfully");
        fetchData(); // Fetch updated data after delete
        toast.success("Item deleted successfully", {position: toast.POSITION.TOP_CENTER,});
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Error deleting item", {position: toast.POSITION.TOP_CENTER,});
      });
  };

  const handleUpdate = (_id) => {
    const invId = _id;
    const inventory = data.find((item) => item._id === invId);
    navigate(`/updateInventory/${invId}`, { state: { inventory } });
  };

  return (
    <div className="Table">
      <h3>Inventories</h3>

      <div className="search-box">
        <input
          className="search-text"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <a className="search-btn" href="#">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
      </div>

      <PDFDownloadLink document={<PDFfile />} fileName="Inventory_report">
        {({ loading }) =>
          loading ? (
            <button className="pdfBtn" disabled>Download</button>
          ) : (
            <button className="pdfBtn">Download</button>
          )
        }
      </PDFDownloadLink>

      <ToastContainer />

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
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
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
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
                <TableRow
                  key={item.Id}
                  sx={{ borderBottom: "1px solid #bad7b6" }}
                >
                  <TableCell align="left">{item.Id}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">{item.location}</TableCell>
                  <TableCell align="left">{item.inTime}</TableCell>
                  <TableCell align="left">{item.outTime}</TableCell>
                  <TableCell align="left">{item.supplier}</TableCell>
                  <TableCell align="left">
                    <button
                      className="updateBtn"
                      onClick={() => {
                        handleUpdate(item._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
