import React from "react";
import "./inventoryAdminPanal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import MainDashbord from "../../../components/InventoryCo/MainDashbord/MainDashbord"
import UserProfile from "../../../components/InventoryCo/UserProfile/UserProfile";
export default function inventoryAdminPanal() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDashbord/>
        <UserProfile/>
      </div>
    </div>
  );
}
