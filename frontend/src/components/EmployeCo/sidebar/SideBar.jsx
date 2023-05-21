/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FilterNoneRoundedIcon from "@mui/icons-material/FilterNoneRounded";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sideBarVarients, linkVarients, shadeVarients, scaleVariantInner, UlVarients } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const SideBar = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentEmployee = async () => {
      const token = window.localStorage.getItem("accessToken"); // Get the authentication token from localStorage

      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get("/employees/current", { headers });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentEmployee();
  }, []);

  const logOut = () => {
    // disable caching of protected pages after logout
    axios.defaults.headers.common["Cache-Control"] = "no-cache, no-store, must-revalidate";
    axios.defaults.headers.common["Pragma"] = "no-cache";
    axios.defaults.headers.common["Expires"] = "0";
    // clear session data or authentication tokens
    window.localStorage.removeItem("accessToken");
    // redirect the user to the login page
    navigate("/");
    window.location.reload(true);
  };

  return (
    <motion.div className="SideBar" variants={sideBarVarients} initial="initial" animate="animate">
      <div className="top">
        <div className="item">
          {user ? (
            <>
              <motion.img className="avatar" src={user.img} alt="photo" variants={scaleVariantInner} />
              <motion.span className="admin-logo" variants={shadeVarients}>
                {user.name}
              </motion.span>
            </>
          ) : (
            <>
              <motion.img
                className="avatar"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                alt="photo"
                variants={scaleVariantInner}
              />
              <motion.span className="admin-logo" variants={shadeVarients}>
                {user.name}
              </motion.span>
            </>
          )}
        </div>
      </div>
      <div className="center">
        <motion.ul variants={UlVarients}>
          <p className="title">MAIN</p>
          {/* DashBoard  link */}
          <Link to="/EmployeeAdminPanal">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <DashboardIcon className="icon" />
              <span>DashBoard</span>
            </motion.li>
          </Link>
          <p className="title">DATA</p>
          {/* manage team link */}
          <Link to="/EmployeeAdminPanal/ReportGenerate">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <FilterNoneRoundedIcon className="icon" />
              <span>Report Generate</span>
            </motion.li>
          </Link>
          {/* employee info link */}
          <Link to="/EmployeeAdminPanal/EmployeeInfo">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <FeedOutlinedIcon className="icon" />
              <span>Employee Info</span>
            </motion.li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollSummery">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <RequestQuoteOutlinedIcon className="icon" />
              <span>Payroll Summary</span>
            </motion.li>
          </Link>
          <p className="title">PAGES</p>
          {/* profile page link */}
          <Link to="/EmployeeAdminPanal/Profile">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <PersonSearchOutlinedIcon className="icon" />
              <span>Profile Form</span>
            </motion.li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollEntry">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <PaidOutlinedIcon className="icon" />
              <span>Payroll Entry</span>
            </motion.li>
          </Link>
          <p className="title">CHARTS</p>
          <Link to="/EmployeeAdminPanal/BarPage">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <LeaderboardOutlinedIcon className="icon" />
              <span>Bar Chart</span>
            </motion.li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollPage">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <StackedLineChartOutlinedIcon className="icon" />
              <span>Line Chart</span>
            </motion.li>
          </Link>
          <Link to="/EmployeeAdminPanal/PiePage">
            <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
              <DonutSmallOutlinedIcon className="icon" />
              <span>Pie Chart</span>
            </motion.li>
          </Link>
          <p className="title">USER</p>
          <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </motion.li>

          <motion.li variants={linkVarients} whileHover="whileHover" transition={{ type: "spring", stiffness: 250 }} onClick={logOut}>
            <LogoutOutlinedIcon className="icon" />
            <span>Log Out</span>
          </motion.li>
        </motion.ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </motion.div>
  );
};
