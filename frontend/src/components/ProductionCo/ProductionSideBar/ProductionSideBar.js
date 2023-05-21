import React from "react";
import { Link } from "react-router-dom";
import "./productionSidebar.css";

const ProductionSideBar = () => {
  return (
    <div className="ProductionSideBar">
      <ul>
        <li>
          <Link to="/productions">All Productions</Link>
        </li>
        <li>
          <Link to="/productions/create">CreateProduction</Link>
        </li>
        <li>
          <Link to="/productions/create">SingleProduction</Link>
        </li>
        <li>
          <Link to="/productions/create">EditProduction</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductionSideBar;
