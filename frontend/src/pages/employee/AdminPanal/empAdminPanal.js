import React from "react";
import "./empPanal.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";

export default function empAdminPanal() {
  return (
    <div className="empAdminPanal">
      <SideBar />
      <div className="home-container">home</div>
    </div>
  );
}
