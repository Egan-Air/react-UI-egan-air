import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
//import './dashboard.css';
import './DeparturesTile';
import DeparturesTile from './DeparturesTile';
import InFlightTile from './InFlightTile';
import ArrivalsTile from './ArrivalsTile';
import MapTile from './MapTile';

const Dashboard = () => {
  // Initial list of tiles
  const [tiles, setTiles] = useState([
    { id: '1', title: <DeparturesTile /> },
    { id: '2', title: <InFlightTile /> },
    { id: '3', title: <ArrivalsTile /> },
    { id: '4', title: <MapTile /> },
  ]); 

  // Function to handle drag end
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    // Rearrange the tiles
    const updatedTiles = Array.from(tiles);
    const [movedTile] = updatedTiles.splice(source.index, 1);
    updatedTiles.splice(destination.index, 0, movedTile);

    setTiles(updatedTiles);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dashboard" direction="horizontal">
        {(provided) => (
          <div
            className="dashboard"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
            }}
          >
            {tiles.map((tile, index) => (
              <Draggable key={tile.id} draggableId={tile.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: '16px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {tile.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
