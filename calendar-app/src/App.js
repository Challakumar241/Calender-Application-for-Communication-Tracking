import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import CommunicationForm from './components/CommunicationForm';
import AdminPage from './components/AdminPage';
import './App.css';
import Calendar from './components/Calendar'; // Update the path if needed


const App = () => {
  const [companies, setCompanies] = useState([]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>

          <Route path="/" element={<MainDashboard companies={companies} />} />
          <Route path="/admin" element={<AdminPage setCompanies={setCompanies} companies={companies} />} />
          <Route path="/calendar" element={<Calendar />} />
          
        </Routes>
      </div>
    </Router>
  );
};

const MainDashboard = ({ companies }) => (
  <div className="dashboard-container">
    <h2>Communication Dashboard</h2>
    <div className="dashboard-sections">
      <Notifications />
      <CommunicationForm companies={companies} />
    </div>
  </div>
);

export default App;
