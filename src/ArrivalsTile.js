// ArrivalsTile.js
import React from 'react';

const ArrivalsTile = () => {
  const arrivals = [
    { id: 1, flight: 'AF222', time: '13:45' },
    { id: 2, flight: 'LH333', time: '14:20' },
  ];

  return (
    <div style={styles.tile}>
      <h3>Incoming Arrivals</h3>
      <ul>
        {arrivals.map((arrival) => (
          <li key={arrival.id}>
            {arrival.flight} - {arrival.time}
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

export default ArrivalsTile;
