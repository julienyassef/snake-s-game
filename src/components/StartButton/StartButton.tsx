import React from 'react';

interface StartButtonProps {
  onStart: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button
      onClick={onStart}
      className="bg-[#95C695] text-white font-bold py-2 px-4 rounded mt-4"
    >
      Démarrer la Partie
    </button>
  );
};

export default StartButton;
