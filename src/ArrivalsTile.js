import React, { useState, useEffect } from 'react';

const ArrivalsTile = () => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual REST API endpoint
  const apiEndpoint = 'http://localhost:8082/arrivals';

  useEffect(() => {
    const fetchArrivals = async () => {
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
          .filter((flight) => new Date(flight.arrival_time) > currentTime) // Filter future arrivals
          .map((flight, index) => ({
            id: index,
            flight: flight.flight_id,
            time: new Date(flight.arrival_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            origin: flight.origin,
            status: flight.status,
          }));
        setArrivals(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArrivals();
  }, []);

  return (
    <div style={styles.tile}>
      <h3>Upcoming SDF Arrivals</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {arrivals.map((arrival) => (
            <li key={arrival.id}>
               {arrival.flight} from {arrival.origin} arriving {arrival.time} - {arrival.status}
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

export default ArrivalsTile;