import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Engage Calendar</h1>
      <div className="nav-buttons">
        <Link to="/"><button>Dashboard</button></Link>
        <Link to="/admin"><button>Add Company</button></Link>
        <Link to="/calendar"><button>Calendar</button></Link> {/* Updated here */}
      </div>
    </nav>
  );
};

export default Navbar;
