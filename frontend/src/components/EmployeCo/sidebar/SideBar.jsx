import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="top">
        <span className="admin-logo">Admin Panal</span>
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
          <Link to="/EmployeeAdminPanal/ManageTeam">
            <li>
              <GroupAddOutlinedIcon className="icon" />
              <span>Manage Team</span>
            </li>
          </Link>
          {/* employee info link */}
          <Link to="/EmployeeAdminPanal/EmployeeInfo">
            <li>
              <FeedOutlinedIcon className="icon" />
              <span>Employee Info</span>
            </li>
          </Link>
          <li>
            <RequestQuoteOutlinedIcon className="icon" />
            <span>Payroll Summary</span>
          </li>
          <p className="title">PAGES</p>
          {/* profile page link */}
          <Link to="/EmployeeAdminPanal/Profile">
            <li>
              <PersonSearchOutlinedIcon className="icon" />
              <span>Profile Form</span>
            </li>
          </Link>
          <li>
            <PaidOutlinedIcon className="icon" />
            <span>Payroll Entry</span>
          </li>
          <p className="title">CHARTS</p>
          <li>
            <LeaderboardOutlinedIcon className="icon" />
            <span>Bar Chart</span>
          </li>
          <li>
            <StackedLineChartOutlinedIcon className="icon" />
            <span>Line Chart</span>
          </li>
          <li>
            <DonutSmallOutlinedIcon className="icon" />
            <span>Pie Chart</span>
          </li>
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
