import React from 'react'
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar"
import AddForm from "../../../components/InventoryCo/AddForm/AddForm"
import UserProfile from '../../../components/InventoryCo/UserProfile/UserProfile'

const AddInventory = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <AddForm/>
        <UserProfile/>
        
      </div>
    </div>
  )
}

export default AddInventory