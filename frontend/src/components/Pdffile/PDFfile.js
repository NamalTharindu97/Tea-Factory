import React, { useEffect, useState } from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import logoImg from "../../asserts/EmployeAs/Img/logo.png";
import axios from "axios";

const styles = StyleSheet.create({
  body: {
    paddingVertical: 40,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: "gray",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  headerDetails: {
    fontSize: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#D8D8D8",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
    flex: 1,
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    padding: 5,
    flex: 1,
    textAlign: "center",
    borderBottomWidth:1,
    borderColor: "gray",

  },
  image: {
    marginVertical: 10,
    alignSelf: "center",
    width: "40%",
  },

  managerText: {
    position: "absolute",
    fontSize: 10,
    bottom: 50,
    right: 20,
    textAlign: "right",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
  },
});

const PDFfile = () => {
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

  return (
    <Document>
      <Page size="A4" style={styles.body}>
      <View style={styles.header}>
        <Image style={styles.image} src={logoImg} />
          <Text style={styles.headerText}>Ambrosia Tea Factory</Text>
          <Text style={styles.headerDetails}>No 01, Moragolla Rd, Welimada.</Text>
          <Text style={styles.headerDetails}>0769828585</Text>
          <Text style={styles.headerDetails}>www.ambrosia.com</Text>
        </View>
        <Text style={styles.title}>Inventory Report</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>ID</Text>
            <Text style={styles.tableCellHeader}>Name</Text>
            <Text style={styles.tableCellHeader}>Quantity</Text>
            <Text style={styles.tableCellHeader}>Location</Text>
            <Text style={styles.tableCellHeader}>In Time</Text>
            <Text style={styles.tableCellHeader}>Out Time</Text>
            <Text style={styles.tableCellHeader}>Supplier</Text>
          </View>

          {data.map((item) => (
                <View style={styles.tableRow} key={item.Id}>
                    <Text style={styles.tableCell}>{item.Id}</Text>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <Text style={styles.tableCell}>{item.location}</Text>
                    <Text style={styles.tableCell}>{item.inTime}</Text>
                    <Text style={styles.tableCell}>{item.outTime}</Text>
                    <Text style={styles.tableCell}>{item.supplier}</Text>
                </View>
          ))}
        </View>

        <Text style={styles.managerText}>Inventory Manager: Aruna Priyankara</Text>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default PDFfile;
