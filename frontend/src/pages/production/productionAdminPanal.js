import React from "react";
import ProductionSideBar from "../../components/ProductionCo/ProductionSideBar/ProductionSideBar";
import ProductionCard from "../../components/ProductionCo/ProductionCard/ProductionCard";
import "./productionAdminPanel.css";

export default function ProductionAdminPanel() {
  return (
    <div className="production-admin-panal-container">
      <div className="sidebar-container-production">
        <ProductionSideBar />
      </div>
      <div className="card-container-production">
        <ProductionCard />
      </div>
    </div>
  );
}