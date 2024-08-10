import React from 'react';

interface ModalGameOverProps {
  score: number;
  onRestart: () => void;
  onChangeLevel: () => void;
}

const ModalGameOver: React.FC<ModalGameOverProps> = ({ score, onRestart, onChangeLevel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Over</h2>
        <p className="text-lg text-gray-700 mb-6">Votre score: <span className="font-bold">{score}</span></p>
        <div className="flex justify-around space-x-4">
          <button
            className="bg-[#95C695] hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            onClick={onRestart}
          >
            Recommencer
          </button>
          <button
            className="bg-[#95C695] hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            onClick={onChangeLevel}
          >
            Changer de niveau
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGameOver;
