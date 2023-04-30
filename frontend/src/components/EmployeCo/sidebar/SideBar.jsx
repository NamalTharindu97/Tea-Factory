import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="top">
        <span className="admin-logo">Admin Panal</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>DashBoard</span>
          </li>
          <p className="title">DATA</p>
          {/* manage team link */}
          <Link to="/EmployeeAdminPanal/ManageTeam">
            <li>
              <DashboardIcon className="icon" />
              <span>Manage Team</span>
            </li>
          </Link>
          {/* employee info link */}
          <Link to="/EmployeeAdminPanal/EmployeeInfo">
            <li>
              <DashboardIcon className="icon" />
              <span>Employee Info</span>
            </li>
          </Link>
          <li>
            <DashboardIcon className="icon" />
            <span>Payroll Summary</span>
          </li>
          <p className="title">PAGES</p>
          {/* profile page link */}
          <Link to="/EmployeeAdminPanal/Profile">
            <li>
              <DashboardIcon className="icon" />
              <span>Profile Form</span>
            </li>
          </Link>
          <li>
            <DashboardIcon className="icon" />
            <span>Payroll Entry</span>
          </li>
          <p className="title">CHARTS</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Bar Chart</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Line Chart</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Pie Chart</span>
          </li>
          <p className="title">USER</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
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
