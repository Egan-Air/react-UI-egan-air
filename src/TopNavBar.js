// TopNavBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img
          src="logo.png"
          alt="Egan Air"
          style={styles.logo}
        />
        <span>Egan Air (Louisville - SDF)</span>
      </div>
      <div style={styles.dateTime}>
        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/settings" style={styles.link}>Settings</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#282c34',
    color: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logo: {
    height: '50px', 
    width: 'auto',
  },
  dateTime: {
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'center',
    flex: 1,
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
  },
};

export default TopNavBar;
