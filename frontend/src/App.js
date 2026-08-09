import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AppShell from "./layouts/AppShell";
import RequireRole from "./components/RequireRole";
import LoginPage from "./pages/login/Login";

const EmployeeDashboard = lazy(() => import("./pages/employee/Dashboard"));
const EmployeeInfo = lazy(() => import("./pages/employee/EmployeeInfo"));
const EmployeeUpdate = lazy(() => import("./pages/employee/EmployeeUpdate"));
const CreateEmployee = lazy(() => import("./pages/employee/CreateEmployee"));
const CreatePayroll = lazy(() => import("./pages/employee/CreatePayroll"));
const PayrollSummary = lazy(() => import("./pages/employee/PayrollSummary"));
const PayrollUpdate = lazy(() => import("./pages/employee/PayrollUpdate"));
const Insights = lazy(() => import("./pages/employee/Insights"));
const Assistant = lazy(() => import("./pages/employee/Assistant"));

const InventoryDashboard = lazy(() => import("./pages/inventory/Dashboard"));
const AddInventory = lazy(() => import("./pages/inventory/AddInventory"));
const ViewInventory = lazy(() => import("./pages/inventory/ViewInventory"));
const Analytics = lazy(() => import("./pages/inventory/Analytics"));
const UpdateInventory = lazy(() => import("./pages/inventory/UpdateInventory"));

const ProductionDashboard = lazy(() => import("./pages/production/Dashboard"));
const ProductionList = lazy(() => import("./pages/production/ProductionList"));
const ProductionEdit = lazy(() => import("./pages/production/ProductionEdit"));
const ProductionAdd = lazy(() => import("./pages/production/ProductionAdd"));

const SupplierDashboard = lazy(() => import("./pages/supplier/Dashboard"));
const Suppliers = lazy(() => import("./pages/supplier/Suppliers"));
const AddSupplier = lazy(() => import("./pages/supplier/AddSupplier"));
const EditSupplier = lazy(() => import("./pages/supplier/EditSupplier"));

const HR = ["HR Manager"];
const INV = ["Inventory Manager"];
const PROD = ["Production Manager"];
const SUPL = ["Suplier Manager"];

const LoadingScreen = () => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", bgcolor: "var(--bg)" }}>
    <CircularProgress />
  </Box>
);

const Lazy = ({ component, roles }) => {
  const Comp = component;
  return (
    <RequireRole roles={roles}>
      <Comp />
    </RequireRole>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<AppShell />}>
            <Route path="/hr/dashboard" element={<Lazy component={EmployeeDashboard} roles={HR} />} />
            <Route path="/hr/employees" element={<Lazy component={EmployeeInfo} roles={HR} />} />
            <Route path="/hr/employees/new" element={<Lazy component={CreateEmployee} roles={HR} />} />
            <Route path="/hr/employees/:id" element={<Lazy component={EmployeeUpdate} roles={HR} />} />
            <Route path="/hr/payroll/new" element={<Lazy component={CreatePayroll} roles={HR} />} />
            <Route path="/hr/payroll" element={<Lazy component={PayrollSummary} roles={HR} />} />
            <Route path="/hr/payroll/:id" element={<Lazy component={PayrollUpdate} roles={HR} />} />
            <Route path="/hr/insights" element={<Lazy component={Insights} roles={HR} />} />
            <Route path="/hr/assistant" element={<Lazy component={Assistant} roles={HR} />} />

            <Route path="/InventoryAdminPanal" element={<Lazy component={InventoryDashboard} roles={INV} />} />
            <Route path="/addInventory" element={<Lazy component={AddInventory} roles={INV} />} />
            <Route path="/viewInventory" element={<Lazy component={ViewInventory} roles={INV} />} />
            <Route path="/analyzeInventory" element={<Lazy component={Analytics} roles={INV} />} />
            <Route path="/updateInventory/:id" element={<Lazy component={UpdateInventory} roles={INV} />} />

            <Route path="/ProductionAdminPanal" element={<Lazy component={ProductionDashboard} roles={PROD} />} />
            <Route path="/ProductionAdminPanal/ProductionList" element={<Lazy component={ProductionList} roles={PROD} />} />
            <Route path="/ProductionAdminPanal/ProductionList/ProductionForm/:id" element={<Lazy component={ProductionEdit} roles={PROD} />} />
            <Route path="/ProductionAdminPanal/ProductionAdd" element={<Lazy component={ProductionAdd} roles={PROD} />} />

            <Route path="/SupplierAdminPanal" element={<Lazy component={SupplierDashboard} roles={SUPL} />} />
            <Route path="/SupplierAdminPanal/Suppliers" element={<Lazy component={Suppliers} roles={SUPL} />} />
            <Route path="/SupplierAdminPanal/AddSupplier" element={<Lazy component={AddSupplier} roles={SUPL} />} />
            <Route path="/SupplierAdminPanal/EditSupplier/:id" element={<Lazy component={EditSupplier} roles={SUPL} />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
