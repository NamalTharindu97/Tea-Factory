import React from "react";
import { Link } from "react-router-dom";
import "./productionSidebar.css";
import SidebarImage from "../../../asserts/ProductionAs/images/logo.png";





const ProductionSideBar = () => {
  return (
    <div className="ProductionSideBar">
      <div className="sidebar-header">
        <img src={SidebarImage} alt="Sidebar Image" className="sidebar-image" />
        <h2 className="sidebar-title">Ambrosia</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/ProductionAdminPanal/ProductionList" className="sidebar-link">
            All Productions
          </Link>
        </li>
        <li>
          <Link to="/ProductionAdminPanal/ProductionAdd" className="sidebar-link">
            Create Production
          </Link>
        </li>
        <li>
          <Link to="/productions/create" className="sidebar-link">
            Single Production
          </Link>
        </li>
        <li>
          <Link to="/productions/create" className="sidebar-link">
            Edit Production
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductionSideBar;
