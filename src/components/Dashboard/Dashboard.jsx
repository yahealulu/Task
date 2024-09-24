import React from 'react';
import './Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const location = useLocation();
  const { role } = location.state || {};
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
       {role=='super_admins'&&<li onClick={() => handleNavigate('/Addadmin')}>Add Admin</li>}   
          <li onClick={() => handleNavigate('/Addclinic')}>Medical Clinics</li>
        </ul>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        {/* Content will go here */}
      </div>
    </div>
  );
};

export default Dashboard;
