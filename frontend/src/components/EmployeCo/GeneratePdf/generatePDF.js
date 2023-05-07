import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../asserts/EmployeAs/Img/logo.png";

export const generatePDF = ({ data }) => {
  const doc = new jsPDF();

  // Add logo image to the document
  doc.addImage(
    logo, // image source
    "PNG", // image type
    doc.internal.pageSize.getWidth() / 2 - 38, // x position of the image
    4, // y position of the image
    60, // image width
    30 // image height
  );

  // Add title below the logo
  doc.setFontSize(13);
  doc.text("“Employee Personal Information Report", doc.internal.pageSize.getWidth() / 2 - 10, 35, null, null, "center");
  doc.setFontSize(10);
  doc.text("“Ambrosia” Tea Co (Pvt) Ltd", doc.internal.pageSize.getWidth() / 2 - 10, 40, null, null, "center");
  doc.setFontSize(10);
  doc.text("“123 Main Street", doc.internal.pageSize.getWidth() / 2 - 10, 45, null, null, "center");
  doc.setFontSize(10);
  doc.text("“Maskeliya, Sri Lanka", doc.internal.pageSize.getWidth() / 2 - 10, 50, null, null, "center");

  // Add table below the title
  autoTable(doc, {
    head: [["Name", "Email", "Phone", "Gender", "Age", "Role"]],
    body: data.map(({ name, email, phone, gender, age, role }) => [name, email, phone, gender, age, role]),
    startY: 70,
  });
  const margin = 10;
  const startY = 70;
  const tableHeight = doc.lastAutoTable.finalY + margin;

  // Add border around the table
  doc.setLineWidth(0.5);
  doc.rect(margin, startY - margin / 2, doc.internal.pageSize.getWidth() - margin * 2, tableHeight + margin, "S");

  // Add border around the entire page
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setLineWidth(0.5);
  doc.rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin, "S");

  // Add a new page with the same border
  doc.addPage();
  doc.setLineWidth(0.5);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10, "S");

  doc.save("report.pdf");

  return <div>generatePDF</div>;
};
