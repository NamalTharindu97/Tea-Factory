import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import EmployeeAdminPanal from "./pages/employee/AdminPanal/empAdminPanal";
import InventoryAdminPanal from "./pages/inventory/inventoryAdminPanal";
import SupplierAdminPanal from "./pages/supplier/supplierAdminPanal";
import ProductionAdminPanal from "./pages/production/productionAdminPanal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmployeeAdminPanal" element={<EmployeeAdminPanal />} />
        <Route path="/InventoryAdminPanal" element={<InventoryAdminPanal />} />
        <Route path="/SupplierAdminPanal" element={<SupplierAdminPanal />} />
        <Route path="/ProductionAdminPanal" element={<ProductionAdminPanal />} />
      </Routes>
    </Router>
  );
}

export default App;
