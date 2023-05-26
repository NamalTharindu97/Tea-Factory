import React from "react";
import Cards from "../../InventoryCo/Cards/Cards.jsx";
import LatestTable from "../../InventoryCo/LatestTable/LatestTable.jsx"
import WelcomeCard from "../WelcomeCard/WelcomeCard.jsx";

const MainDashbord = () => {
  return <div className="MainDash">
  <h1>Inventory Dashbord</h1>
  <WelcomeCard/>
  <Cards/>
  <LatestTable/>
</div>
  
};

export default MainDashbord;
