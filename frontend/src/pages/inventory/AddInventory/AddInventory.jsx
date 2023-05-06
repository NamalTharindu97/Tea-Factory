import React from "react";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import AddInventoryForm from "../../../components/InventoryCo/AddForm/AddForm";

const AddInventory = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        Add Inventory
      </div>
    </div>
  );
};

export default AddInventory;
