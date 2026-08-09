import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import InsightsIcon from "@mui/icons-material/Insights";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandshakeIcon from "@mui/icons-material/Handshake";

export const NAV = [
  {
    role: "HR Manager",
    roles: ["HR Manager", "HR Assistant"],
    title: "Employee Management",
    items: [
      { label: "Dashboard", path: "/hr/dashboard", icon: DashboardIcon },
      { label: "Employees", path: "/hr/employees", icon: PeopleIcon },
      { label: "Create Employee", path: "/hr/employees/new", icon: PersonAddAlt1Icon },
      { label: "Payroll Entry", path: "/hr/payroll/new", icon: PaidIcon },
      { label: "Payroll Summary", path: "/hr/payroll", icon: ReceiptLongIcon },
      { label: "AI Insights", path: "/hr/insights", icon: InsightsIcon },
      { label: "AI Assistant", path: "/hr/assistant", icon: SmartToyIcon },
    ],
  },
  {
    role: "Inventory Manager",
    roles: ["Inventory Manager", "Inventory Clerk", "Quality Inspector"],
    title: "Inventory Management",
    items: [
      { label: "Dashboard", path: "/InventoryAdminPanal", icon: DashboardIcon },
      { label: "View Inventory", path: "/viewInventory", icon: Inventory2Icon },
      { label: "Add Inventory", path: "/addInventory", icon: AddBoxIcon },
      { label: "Analytics", path: "/analyzeInventory", icon: AnalyticsIcon },
    ],
  },
  {
    role: "Production Manager",
    roles: ["Production Manager", "Production Worker"],
    title: "Production Management",
    items: [
      { label: "Dashboard", path: "/ProductionAdminPanal", icon: DashboardIcon },
      { label: "All Productions", path: "/ProductionAdminPanal/ProductionList", icon: ListAltIcon },
      { label: "Create Production", path: "/ProductionAdminPanal/ProductionAdd", icon: AddBusinessIcon },
    ],
  },
  {
    role: "Suplier Manager",
    roles: ["Suplier Manager"],
    title: "Supplier Management",
    items: [
      { label: "Dashboard", path: "/SupplierAdminPanal", icon: DashboardIcon },
      { label: "Suppliers", path: "/SupplierAdminPanal/Suppliers", icon: LocalShippingIcon },
      { label: "Add Supplier", path: "/SupplierAdminPanal/AddSupplier", icon: HandshakeIcon },
    ],
  },
];
