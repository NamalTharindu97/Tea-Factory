import React from "react";
import "./piepage.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { PieChart } from "../../../components/EmployeCo/pieChart/PieChart";

export const PiePage = () => {
  return (
    <div className="PiePage">
      <SideBar />
      <div className="pie-container">
        <NavBar />
        <div className="pie">
          <PieChart />
        </div>
      </div>
    </div>
  );
};
