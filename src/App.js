import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
//import Settings from './Settings';
//import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        {/* Top Navigation Bar */}
        <TopNavBar />

        <div style={styles.content}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Workspace */}
          <div style={styles.workspace}>
            <Routes>
              {/* Routes for Dashboard, Settings, and Profile */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" /*element={<Settings />}*/ />
              <Route path="/profile" /*element={<Profile />}*/ />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    display: 'flex',
    flex: 1,
  },
  workspace: {
    flex: 1,
    padding: '20px',
    background: '#f0f0f0',
    overflowY: 'auto', // Scrollable workspace
  },
};

export default App;
