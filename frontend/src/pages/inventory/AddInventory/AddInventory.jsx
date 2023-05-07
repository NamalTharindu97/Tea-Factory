import React from 'react'
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar"
import AddForm from "../../../components/InventoryCo/AddForm/AddForm"

const AddInventory = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <AddForm/>
        
      </div>
    </div>
  )
}

export default AddInventory