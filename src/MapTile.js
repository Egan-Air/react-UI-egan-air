import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapTile = () => {
  // Map container styles
  const containerStyle = {
    height: '300px',
    borderRadius: '8px',
  };

  // Default map center (San Francisco)
  const center = {
    lat: 38.328732,
    lng: -85.764771,
  };

  return (
    <div style={styles.tile}>
      <h3>Interactive Map</h3>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
        >
          {/* You can add additional components like markers or info windows here */}
        </GoogleMap>
      </LoadScript>
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

export default MapTile;