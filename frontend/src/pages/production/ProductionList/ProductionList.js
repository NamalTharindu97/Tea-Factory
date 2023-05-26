import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import ProductionFooter from "../../../components/ProductionCo/ProductionFooter/ProductionFooter";
import ProductionPieChart from "../../../components/ProductionCo/ProductionPieChart/ProductionPieChart";




const ProductionList = () => {
  const [production, setProduction] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    batchNumber: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProduction = async () => {
      try {
        const response = await axios.get("/productions/");
        setProduction(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduction();
  }, []);

  const handleUpdate = (id) => {
    const product = production.find((pro) => pro._id === id);
    navigate(`/ProductionAdminPanal/ProductionList/ProductionForm/${id}`, { state: { product } });
  };
  
  const handleView = (id) => {
    const product = production.find((pro) => pro._id === id);
    navigate(`/ProductionAdminPanal/ProductionList/ProductionView/${id}`, { state: { product } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/productions/${id}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  const filteredProduction = production.filter((pro) => {
    const startDateMatch = filters.startDate ? pro.startDate.includes(filters.startDate) : true;
    const endDateMatch = filters.endDate ? pro.endDate.includes(filters.endDate) : true;
    const batchNumberMatch = filters.batchNumber ? pro.batchNumber.includes(filters.batchNumber) : true;
    const searchTermMatch = pro.ProdutionID.toLowerCase().includes(searchTerm.toLowerCase());

    return startDateMatch && endDateMatch && batchNumberMatch && searchTermMatch;
  });

  const generateReport = () => {
    const Report = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Filtered Production Report</Text>
          {filteredProduction.map((pro) => (
            <View key={pro._id} style={styles.row}>
              <Text style={styles.column}>{pro.ProdutionID}</Text>
              <Text style={styles.column}>{pro.description}</Text>
              <Text style={styles.column}>{pro.startDate}</Text>
              <Text style={styles.column}>{pro.endDate}</Text>
              <Text style={styles.column}>{pro.status}</Text>
              <Text style={styles.column}>{pro.teaType}</Text>
              <Text style={styles.column}>{pro.batchNumber}</Text>
            </View>
          ))}
        </Page>
      </Document>
    );

    const blob = new Blob([<Report />], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div>
    <h3 style={{ textAlign: 'center' }}>Production Dashboard</h3>
    
      <div>
        <input
          type="text"
          placeholder="Search by Production ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="text" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <label>End Date:</label>
        <input type="text" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
        <label>Batch Number:</label>
        <input type="text" name="batchNumber" value={filters.batchNumber} onChange={handleFilterChange} />
      </div>
      <button onClick={generateReport}>Generate Report</button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Production ID</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Tea Type</th>
            <th>Batch Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduction.map((pro) => (
            <tr key={pro._id}>
              <td>{pro.ProdutionID}</td>
              <td>{pro.description}</td>
              <td>{pro.startDate}</td>
              <td>{pro.endDate}</td>
              <td>{pro.status}</td>
              <td>{pro.teaType}</td>
              <td>{pro.batchNumber}</td>
              <td>
                <button onClick={() => handleUpdate(pro._id)}>Update</button>
                <button onClick={() => handleDelete(pro._id)}>Delete</button>
                {<button onClick={() => handleView(pro._id)}>View</button> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   
      <ProductionPieChart/>
      
     
 <div className="foot3">
<ProductionFooter/>
</div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ProductionList;
