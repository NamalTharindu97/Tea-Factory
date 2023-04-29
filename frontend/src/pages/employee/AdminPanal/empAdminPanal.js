import React from "react";
import "./empPanal.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";

export default function empAdminPanal() {
  return (
    <div className="empAdminPanal">
      <SideBar />
      <div className="home-container">
        <NavBar />
        home
      </div>
    </div>
  );
}
