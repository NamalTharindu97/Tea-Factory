import React from "react";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import AnalyticsCards from "../../../components/InventoryCo/AnalyticsCards/AnalyticsCards";
import HorizontalScroll from "react-scroll-horizontal";
import Cards from "../../../components/InventoryCo/Cards/Cards";
import AnalyticMain from "../../../components/InventoryCo/AnalyticsCards/AnalyticMain";
import DashboardSummary from "../../../components/InventoryCo/DashbordSummery/DashbordSummery";
const Analytics = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />

        {/* <h2>Inventory Analytics</h2> */}
        <AnalyticMain/>
        <DashboardSummary/>
      </div>
    </div>
  );
};

export default Analytics;
