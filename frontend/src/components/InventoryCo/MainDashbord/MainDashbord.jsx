import React from "react";
import Cards from "../../InventoryCo/Cards/Cards.jsx";
import Table from "../../InventoryCo/Table/Table";

const MainDashbord = () => {
  return <div className="MainDash">
  <h1>Inventory Dashbord</h1>
  <Cards/>
  <Table/>
</div>
  
};

export default MainDashbord;
