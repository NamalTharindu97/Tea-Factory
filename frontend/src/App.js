import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import EmployeeAdminPanal from "./pages/employee/AdminPanal/empAdminPanal";
import InventoryAdminPanal from "./pages/inventory/Dashbord/inventoryAdminPanal";
import SupplierAdminPanal from "./pages/supplier/supplierAdminPanal";
import ProductionAdminPanal from "./pages/production/productionAdminPanal";
import AddInventory from "./pages/inventory/AddInventory/AddInventory"
import ViewInventory from "./pages/inventory/ViewInventory/ViewInventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmployeeAdminPanal" element={<EmployeeAdminPanal />} />
        <Route path="/InventoryAdminPanal" element={<InventoryAdminPanal />} />
        <Route path="/SupplierAdminPanal" element={<SupplierAdminPanal />} />
        <Route path="/ProductionAdminPanal" element={<ProductionAdminPanal />} />
        <Route path="/addInventory" element={<AddInventory />} />
        <Route path="/viewInventory" element={<ViewInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
