import React from 'react';

interface MobileControlsProps {
  onDirectionChange: (vx: number, vy: number) => void;
  vx: number;
  vy: number;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange, vx, vy }) => {
  const cellSize = 10;

  const handleDirectionChange = (newVx: number, newVy: number) => {
    const monter = vy === -cellSize;
    const descendre = vy === cellSize;
    const adroite = vx === cellSize;
    const agauche = vx === -cellSize;

    if (newVx === -cellSize && !adroite) {
      onDirectionChange(newVx, 0);
    }
    if (newVy === -cellSize && !descendre) {
      onDirectionChange(0, newVy);
    }
    if (newVx === cellSize && !agauche) {
      onDirectionChange(newVx, 0);
    }
    if (newVy === cellSize && !monter) {
      onDirectionChange(0, newVy);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 grid grid-cols-3 gap-2 p-4">
      <div />
      <button
        className="p-4 bg-gray-800 text-white rounded shadow-lg flex items-center justify-center active:translate-y-1 active:translate-x-1 transform transition-transform"
        onClick={() => handleDirectionChange(0, -cellSize)}
      >
        ↑
      </button>
      <div />
      <button
        className="p-4 bg-gray-800 text-white rounded shadow-lg flex items-center justify-center active:translate-y-1 active:translate-x-1 transform transition-transform"
        onClick={() => handleDirectionChange(-cellSize, 0)}
      >
        ←
      </button>
      <button
        className="p-4 bg-gray-800 text-white rounded shadow-lg flex items-center justify-center active:translate-y-1 active:translate-x-1 transform transition-transform"
        onClick={() => handleDirectionChange(0, cellSize)}
      >
        ↓
      </button>
      <button
        className="p-4 bg-gray-800 text-white rounded shadow-lg flex items-center justify-center active:translate-y-1 active:translate-x-1 transform transition-transform"
        onClick={() => handleDirectionChange(cellSize, 0)}
      >
        →
      </button>
    </div>
  );
};

export default MobileControls;
