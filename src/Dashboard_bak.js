import React from 'react';
import FlightsTile from './FlightsTile';
import DeparturesTile from './DeparturesTile';
import ArrivalsTile from './ArrivalsTile';
import MapTile from './MapTile';

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <div style={styles.row}>
        <FlightsTile />
        <DeparturesTile />
      </div>
      <div style={styles.row}>
        <ArrivalsTile />
        <MapTile />
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  row: {
    display: 'flex',
    gap: '20px',
  },
};

export default Dashboard;
