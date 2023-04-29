import React from "react";
import "./empPanal.scss";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import { Widget } from "../../../components/EmployeCo/widgets/Widget";

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
      </div>
    </div>
  );
}