import React from "react";
import "./empPanal.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { Widget } from "../../../components/EmployeCo/widgets/Widget";
import { Recent } from "../../../components/EmployeCo/recentSalary/Recent";
import { Payroll } from "../../../components/EmployeCo/payrollChart/Payroll";
import { HeadCount } from "../../../components/EmployeCo/headCount/HeadCount";
import { BarChart } from "../../../components/EmployeCo/barChart/BarChart";
import { PieChart } from "../../../components/EmployeCo/pieChart/PieChart";

export default function empAdminPanal() {
  return (
    <div className="empAdminPanal">
      <SideBar />
      <div className="home-container">
        <NavBar />
        <div className="widgets">
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
        <div className="middle">
          <Payroll />
          <PieChart />
        </div>
        <div className="low">
          <HeadCount />
          <BarChart />
          <Recent />
        </div>
      </div>
    </div>
  );
}
