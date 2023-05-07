import React from "react";
import "./barpage.scss";
import { BarChart } from "../../../components/EmployeCo/barChart/BarChart";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";

export const BarPage = () => {
  return (
    <div className="BarPage">
      <SideBar />
      <div className="bar-container">
        <NavBar />
        <div className="bar">
          <BarChart />
        </div>
      </div>
    </div>
  );
};
