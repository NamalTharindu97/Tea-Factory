import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="top">
        <span className="admin-logo">Admin Panal</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>User</span>
          </li>
          <p className="title">LIST</p>
          <li>
            <DashboardIcon className="icon" />
            <span>User</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Products</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Status</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Notification</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Settings</span>
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
