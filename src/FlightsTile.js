// FlightsTile.js
import React from 'react';

const FlightsTile = () => {
  // Example data, replace with API calls as needed
  const flights = [
    { id: 1, flight: 'AA123', status: 'On Time' },
    { id: 2, flight: 'BA456', status: 'Delayed' },
  ];

  return (
    <div style={styles.tile}>
      <h3>Ongoing Flights</h3>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.flight} - {flight.status}
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

export default FlightsTile;
