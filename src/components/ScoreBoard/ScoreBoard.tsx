import React from 'react';
import { getScores } from '../../utils/LocalStorage';

const ScoreBoard: React.FC = () => {
  const scores = getScores();

  const getScoresByMode = (mode: string) => {
    return scores
      .filter(score => score.mode === mode)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Prend les 3 meilleurs scores
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#95C695]">Classement</h2>
      
      {['lent', 'moyen', 'rapide'].map((mode) => (
        <div key={mode} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 capitalize">{mode}</h3>
          <ul className="list-disc list-inside">
            {getScoresByMode(mode).map((scoreData, index) => (
              <li key={index} className="text-gray-700">
                {scoreData.player}: {scoreData.score} points
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
