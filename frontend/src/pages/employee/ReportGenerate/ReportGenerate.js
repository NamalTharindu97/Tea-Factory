import React from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import "./reportGenerate.scss";

export const ReportGenerate = () => {
  return (
    <div className="ReportGenerate">
      <SideBar />
      <div className="report-generate-container">
        <NavBar />
        <div className="report-container">
          <div className="report-upper">
            <p>Filter data</p>
          </div>
          <div className="report-middle">middle</div>
          <div className="report-lower">lower</div>
        </div>
      </div>
    </div>
  );
};
