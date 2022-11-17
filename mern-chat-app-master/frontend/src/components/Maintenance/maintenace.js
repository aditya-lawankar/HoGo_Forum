import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NavBar from './NavBar';
import MaintenanceCard from './App';

function Maintenance() {
  return (
    <div>
      <NavBar />
      <MaintenanceCard />
    </div>
  );
}

export default Maintenance;
