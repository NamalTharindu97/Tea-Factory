import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierSummery.css";
import Sidebar from "../Sidebar/sidebar";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Static from"../Card/card"


const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
    border:"5px",
    marginBottom:"20px"
    
  
    
   
    
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 30,
    marginRight:"200px"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  tableCol: {
    width: "20%",
    textAlign: "left",
    padding: 5,
  },
 
});

const SupplierSummery = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const response = await axios.get("/supliers/");
        setSuppliers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSupplier();
  }, []);

  const handleUpdate = (id) => {
    const supplier = suppliers.find((sup) => sup._id === id);
    navigate(`/SupplierAdminPanal/SupplierSummery/UpdateSupplier/${id}`, {
      state: { supplier },
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmed) {
      try {
        await axios.delete(`/supliers/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MyDocument = () => (
    <Document>
      <Page size="A3" style={styles.page}>
        <Text style={styles.title}>Suppliers List</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Supplier</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Item</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Address</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Phone</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Email</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Bank</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Bank_No</Text>
            </View>
          </View>
          {filteredSuppliers.map((supplier) => (
            <View style={styles.tableRow} key={supplier._id}>
              <View style={styles.tableCol}>
                <Text>{supplier.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.item}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.address}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.phone}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.bank}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{supplier.bankNo}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="summery-container">
      <Sidebar />
      
      <div className="nav">
        <nav class="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand">Suppliers</a>
          <form class="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </nav>
       
      </div>
      <div className="card">
      <Static/>
      </div>
      
     
      <div className="image"></div>
      <div className="btn2">
        <button className="btn btn-success">
          <a
            href="/SupplierAdminPanal/CreateSupplier"
            style={{ textDecoration: "none", color: "white", marginTop: "200px" }}
          >
            Add Supplier
          </a>
        </button>
     
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Supplier</th>
            <th scope="col">Item</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Bank</th>
            <th scope="col">Bank No</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.item}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.bank}</td>
              <td>{supplier.bankNo}</td>
              <td>
                <button
                  onClick={() => handleUpdate(supplier._id)}
                  className="btn btn-outline-success"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(supplier._id)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFDownloadLink document={<MyDocument />} fileName="suppliers.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : "Download PDF"
          }
        </PDFDownloadLink>
        
    </div>
  );
};

export default SupplierSummery;
