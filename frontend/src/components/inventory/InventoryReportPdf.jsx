import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#1c2a21" },
  header: { borderBottomWidth: 2, borderBottomColor: "#1d7a46", paddingBottom: 8, marginBottom: 4 },
  company: { fontSize: 15, fontWeight: "bold", color: "#115a31" },
  companySub: { fontSize: 9, color: "#5f7166", marginTop: 2 },
  title: { fontSize: 14, fontWeight: "bold", marginTop: 16, marginBottom: 12, textAlign: "center" },
  headRow: { flexDirection: "row", borderBottomWidth: 1.5, borderBottomColor: "#1d7a46", paddingVertical: 6, backgroundColor: "#e9f4ed" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#dde5df", paddingVertical: 6 },
  headCell: { fontWeight: "bold", color: "#115a31", paddingRight: 6 },
  cell: { paddingRight: 6 },
  pageNumber: { textAlign: "right", fontSize: 9, color: "#5f7166", marginTop: 12 },
});

const columns = [
  { key: "Id", label: "ID", flex: 0.7 },
  { key: "name", label: "Name", flex: 1.4 },
  { key: "quantity", label: "Quantity", flex: 0.7 },
  { key: "location", label: "Location", flex: 1 },
  { key: "inTime", label: "In Time", flex: 0.8 },
  { key: "outTime", label: "Out Time", flex: 0.8 },
  { key: "supplier", label: "Supplier", flex: 1.2 },
];

export const InventoryReportPdf = ({ data = [] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.company}>Ambrosia Tea Co (Pvt) Ltd</Text>
        <Text style={styles.companySub}>No 01, Moragolla Rd, Welimada · 0769828585 · www.ambrosia.com</Text>
      </View>
      <Text style={styles.title}>Inventory Report</Text>
      <View style={styles.headRow}>
        {columns.map((c) => (
          <Text key={c.key} style={[styles.headCell, { flex: c.flex }]}>
            {c.label}
          </Text>
        ))}
      </View>
      {data.map((item, idx) => (
        <View key={idx} style={styles.row}>
          {columns.map((c) => (
            <Text key={c.key} style={[styles.cell, { flex: c.flex }]}>
              {item[c.key] ?? "—"}
            </Text>
          ))}
        </View>
      ))}
      <Text style={styles.pageNumber}>Inventory Manager</Text>
    </Page>
  </Document>
);

export default InventoryReportPdf;
