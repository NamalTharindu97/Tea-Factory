import React, { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Sidebar/sidebar.css';

const Sidebar = ({ activeItem, onItemClick }) => {
  const sidebarItems = [
    { id: 1, icon: <FaHome />, label: 'Home', path: '/SupplierAdminPanal/SupplierSummery/' },
    { id: 2, icon: <FaUser />, label: 'Items Analysis',path:'/SupplierAdminPanal/SupplierSummery/chart' },
   
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item ${item.id === activeItem ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          >
            {item.icon}
            <span className="sidebar-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Content = ({ activeItem }) => {
  const contentMap = {
    //1: 'Supplier Summary',
    //2: 'Profile',
    //3: 'Settings'
  };

  return (
    <div className="content">
      <h2>{contentMap[activeItem]}</h2>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(1);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="app">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      <Content activeItem={activeItem} />
    </div>
  );
};

export default App;
