import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AddAdmin from './components/Addadmin/Addadmin';
import AddClinic from './components/Addclinic/Addclinic';
import UpdateClinic from './components/update-clinic/update-clinic';
import Addnewclinic from './components/Addnewclinic/Addnewclinic';
const App = () => {


  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Addadmin" element={<AddAdmin />} />
      <Route path="/Addclinic" element={<AddClinic />} />
      <Route path="/update-clinic/:id" element={<UpdateClinic />} /> 
      <Route path="/Addnewclinic" element={<Addnewclinic />} /> 
    </Routes>
  </Router>
  );
};

export default App;
