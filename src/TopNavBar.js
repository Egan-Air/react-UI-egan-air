// TopNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>Egan Air Dispatch</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/settings" style={styles.link}>Settings</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
    </div>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#282c34', color: '#fff' },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '15px' },
  link: { color: '#61dafb', textDecoration: 'none' },
};

export default TopNavBar;
