import React from "react";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import Table from "../../../components/InventoryCo/Table/Table"

const ViewInventory = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Table/>
        View Inventory
      </div>
    </div>
  );
};

export default ViewInventory;
