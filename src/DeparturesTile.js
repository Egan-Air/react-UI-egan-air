import React, { useState, useEffect } from 'react';

const DeparturesTile = () => {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual REST API endpoint
  const apiEndpoint = 'http://localhost:8081/flights';

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Get the current time
        const currentTime = new Date();

        // Transform the data for easier rendering
        const transformedData = data
          .filter((flight) => new Date(flight.departure_time) > currentTime) // Filter future departures
          .map((flight, index) => ({
            id: index,
            flight: flight.flight_id,
            time: new Date(flight.departure_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            destination: flight.destination,
            status: flight.status,
          }));
        setDepartures(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartures();
  }, []);

  return (
    <div style={styles.tile}>
      <h3>Upcoming SDF Departures</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {departures.map((departure) => (
            <li key={departure.id}>
              Flight {departure.flight} to {departure.destination} - {departure.time} - {departure.status}
            </li>
          ))}
        </ul>
      )}
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