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
import { useEffect, useState } from "react";

export const SideBar = () => {
  const [user, setUser] = useState([]);

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

  return (
    <div className="SideBar">
      <div className="top">
        <div className="item">
          <img className="avatar" src={user.img} alt="photo" />
          <span className="admin-logo">{user.name}</span>
        </div>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          {/* DashBoard  link */}
          <Link to="/EmployeeAdminPanal">
            <li>
              <DashboardIcon className="icon" />
              <span>DashBoard</span>
            </li>
          </Link>
          <p className="title">DATA</p>
          {/* manage team link */}
          <Link to="/EmployeeAdminPanal/ReportGenerate">
            <li>
              <FilterNoneRoundedIcon className="icon" />
              <span>Report Generate</span>
            </li>
          </Link>
          {/* employee info link */}
          <Link to="/EmployeeAdminPanal/EmployeeInfo">
            <li>
              <FeedOutlinedIcon className="icon" />
              <span>Employee Info</span>
            </li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollSummery">
            <li>
              <RequestQuoteOutlinedIcon className="icon" />
              <span>Payroll Summary</span>
            </li>
          </Link>
          <p className="title">PAGES</p>
          {/* profile page link */}
          <Link to="/EmployeeAdminPanal/Profile">
            <li>
              <PersonSearchOutlinedIcon className="icon" />
              <span>Profile Form</span>
            </li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollEntry">
            <li>
              <PaidOutlinedIcon className="icon" />
              <span>Payroll Entry</span>
            </li>
          </Link>
          <p className="title">CHARTS</p>
          <Link to="/EmployeeAdminPanal/BarPage">
            <li>
              <LeaderboardOutlinedIcon className="icon" />
              <span>Bar Chart</span>
            </li>
          </Link>
          <Link to="/EmployeeAdminPanal/PayrollPage">
            <li>
              <StackedLineChartOutlinedIcon className="icon" />
              <span>Line Chart</span>
            </li>
          </Link>
          <Link to="/EmployeeAdminPanal/PiePage">
            <li>
              <DonutSmallOutlinedIcon className="icon" />
              <span>Pie Chart</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};
