import React from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { Payroll } from "../../../components/EmployeCo/payrollChart/Payroll";
import "./payrollpage.scss";

export const PayrollPage = () => {
  return (
    <div className="PayrollPage">
      <SideBar />
      <div className="line-container">
        <NavBar />
        <div className="line">
          <Payroll />
        </div>
      </div>
    </div>
  );
};
