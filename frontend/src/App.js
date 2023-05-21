import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import EmployeeAdminPanal from "./pages/employee/AdminPanal/empAdminPanal";
import InventoryAdminPanal from "./pages/inventory/inventoryAdminPanal";
import SupplierAdminPanal from "./pages/supplier/supplierAdminPanal/supplierAdminPanal";
import ProductionAdminPanal from "./pages/production/productionAdminPanal";
import { Profile } from "./pages/employee/ProfileForm/Profile";
import { EmployeeInfo } from "./pages/employee/EmployeeInfo/EmployeeInfo";
import { ProUpdateForm } from "./pages/employee/ProUpdateForm/ProUpdateForm";
import { BarPage } from "./pages/employee/BarPage/BarPage";
import { PiePage } from "./pages/employee/PiePage/PiePage";
import { PayrollPage } from "./pages/employee/PayrollPage/PayrollPage";
import { PayrollEntry } from "./pages/employee/PayrollEntry/PayrollEntry";
import { PayrollSummery } from "./pages/employee/PayrollSummery/PayrollSummery";
import { PayRollUpdateForm } from "./pages/employee/PayRollUpdateForm/PayRollUpdateForm";
import { ReportGenerate } from "./pages/employee/ReportGenerate/ReportGenerate";
import SupplierSummery from "./pages/supplier/SupplierSummery/SupplierSummery";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmployeeAdminPanal" element={<EmployeeAdminPanal />} />
        <Route path="/InventoryAdminPanal" element={<InventoryAdminPanal />} />
        <Route path="/SupplierAdminPanal" element={<SupplierAdminPanal />} />
        <Route path="/ProductionAdminPanal" element={<ProductionAdminPanal />} />
        <Route path="/EmployeeAdminPanal/Profile" element={<Profile />} />
        <Route path="/EmployeeAdminPanal/EmployeeInfo" element={<EmployeeInfo />} />
        <Route path="/EmployeeAdminPanal/EmployeeInfo/Employee/:id" element={<ProUpdateForm />} />
        <Route path="/EmployeeAdminPanal/BarPage" element={<BarPage />} />
        <Route path="/EmployeeAdminPanal/PiePage" element={<PiePage />} />
        <Route path="/EmployeeAdminPanal/PayrollPage" element={<PayrollPage />} />
        <Route path="/EmployeeAdminPanal/PayrollEntry" element={<PayrollEntry />} />
        <Route path="/EmployeeAdminPanal/PayrollSummery" element={<PayrollSummery />} />
        <Route path="/EmployeeAdminPanal/PayrollSummery/PayRollUpdateForm/:id" element={<PayRollUpdateForm />} />
        <Route path="/EmployeeAdminPanal/ReportGenerate" element={<ReportGenerate />} />
        <Route path="/SupplierAdminPanal/SupplierSummery" element={<SupplierSummery />} />
      </Routes>
    </Router>
  );
}

export default App;
