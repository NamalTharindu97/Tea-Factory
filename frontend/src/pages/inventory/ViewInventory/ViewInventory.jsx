import React from "react";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import Table from "../../../components/InventoryCo/Table/Table"
import { PrograssBar } from "../../../components/EmployeCo/PrograssBar/PrograssBar";

const ViewInventory = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        
        <Table/>
      </div>
    </div>
  );
};

export default ViewInventory;
