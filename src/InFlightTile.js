import React, { useState, useEffect } from 'react';

const InFlightTile = () => {
  const [inflight, setinflight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual REST API endpoint
  const apiEndpoint = 'http://localhost:8083/in-flight';

  useEffect(() => {
    const fetchinflight = async () => {
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
          .filter((flight) => new Date(flight.arrival_time) > currentTime) // Filter future inflight
          .map((flight, index) => ({
            id: index,
            flight: flight.flight_id,
            origin: flight.origin,
            destination: flight.destination,
            time: new Date(flight.arrival_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: flight.status,
          }));
        setinflight(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchinflight();
  }, []);

  return (
    <div style={styles.tile}>
      <h3>Egan Air In-Flight</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {inflight.map((inflight) => (
            <li key={inflight.id}>
              Flight {inflight.flight} from {inflight.origin} to {inflight.destination} - {inflight.time} - {inflight.status}
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

export default InFlightTile;