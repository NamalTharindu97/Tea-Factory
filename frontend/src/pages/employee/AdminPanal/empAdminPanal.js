import React, { useEffect, useState } from "react";
import "./empPanal.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { Widget } from "../../../components/EmployeCo/widgets/Widget";
import { Recent } from "../../../components/EmployeCo/recentSalary/Recent";
import { Payroll } from "../../../components/EmployeCo/payrollChart/Payroll";
import { HeadCount } from "../../../components/EmployeCo/headCount/HeadCount";
import { BarChart } from "../../../components/EmployeCo/barChart/BarChart";
import { PieChart } from "../../../components/EmployeCo/pieChart/PieChart";
import axios from "axios";

export default function EmpAdminPanal() {
  const [totalNet, setTotalNet] = useState();

  useEffect(() => {
    const getTotalNetPayCount = async () => {
      try {
        const response = await axios.get("payrolls/year/totalNetPay");
        setTotalNet(response.data.totalNetPay);
      } catch (error) {
        console.log(error);
      }
    };

    getTotalNetPayCount();
  }, []);

  return (
    <div className="empAdminPanal">
      <SideBar />
      <div className="home-container">
        <NavBar />
        <div className="widgets">
          <Widget type="netPay" totalNet={totalNet} />
          <Widget type="1" />
          <Widget type="2" />
          <Widget type="3" />
        </div>
        <div className="middle">
          <Payroll />
          <Recent />
        </div>
        <div className="low">
          <HeadCount />
          <BarChart />
          <PieChart />
        </div>
      </div>
    </div>
  );
}
