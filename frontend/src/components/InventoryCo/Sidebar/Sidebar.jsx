import React from "react";
import Logo from "../../../asserts/InventoryAs/Img/logo.png";
import "./Sidebar.css";

import { SidebarData } from "../../../asserts/InventoryAs/Data/Data.js";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div className="bars" style={expanded ? { left: "60%" } : { left: "5%" }} onClick={() => setExpanded(!expanded)}>
        <UilBars />
      </div>
      <motion.div className="Sidebar" variants={sidebarVariants} animate={window.innerWidth <= 768 ? `${expanded}` : ""}>
        {/* logo */}
        <div className="inv-logo">
          <img src={Logo} alt="logo" />
          <span>Ambrosia</span>
        </div>

        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link
                to={item.path}
                className={location.pathname === item.path ? "menuItem active" : "menuItem"}
                key={index}
                onClick={()=>setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}

          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
