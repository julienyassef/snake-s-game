import React from 'react';

interface StartButtonProps {
  onStart: () => void; // Fonction à appeler lorsque le bouton est cliqué
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button
      onClick={onStart}
      className="bg-[#94CA94] text-white font-bold py-2 px-4 rounded"
    >
      Démarrer la Partie
    </button>
  );
};

export default StartButton;
