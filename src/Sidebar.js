// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaChartBar, FaToolbox, FaWpforms } from 'react-icons/fa';
import { TiWeatherCloudy } from "react-icons/ti";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.menu}>
        <Link to="/flights" style={styles.link}>
          <FaPlane /> In-Flight
        </Link>
        <Link to="/flight-planning" style={styles.link}>
          <FaWpforms /> Flight Plans
        </Link>
        <Link to="/weather" style={styles.link}>
          <TiWeatherCloudy /> Weather
        </Link>
        <Link to="/reports" style={styles.link}>
          <FaChartBar /> Reports
        </Link>
        <Link to="/tools" style={styles.link}>
          <FaToolbox /> Tools
        </Link>
      </div>
    </div>
  );
};

const styles = {
  sidebar: { width: '250px', background: '#20232a', height: '100vh', padding: '20px', color: '#fff' },
  menu: { display: 'flex', flexDirection: 'column', gap: '15px' },
  link: { color: '#61dafb', textDecoration: 'none', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' },
};

export default Sidebar;