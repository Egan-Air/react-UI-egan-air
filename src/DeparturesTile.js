// DeparturesTile.js
import React from 'react';

const DeparturesTile = () => {
  const departures = [
    { id: 1, flight: 'DL789', time: '14:30' },
    { id: 2, flight: 'UA101', time: '15:00' },
  ];

  return (
    <div style={styles.tile}>
      <h3>Upcoming Departures</h3>
      <ul>
        {departures.map((departure) => (
          <li key={departure.id}>
            {departure.flight} - {departure.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  tile: {
    flex: 1,
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default DeparturesTile;
