import React from 'react';

interface ModeDisplayProps {
  mode: string;
}

const ModeDisplay: React.FC<ModeDisplayProps> = ({ mode }) => {
  return (
    <div className="mt-4">
      <span className="text-xl font-semibold">Mode: {mode}</span>
    </div>
  );
};

export default ModeDisplay;
