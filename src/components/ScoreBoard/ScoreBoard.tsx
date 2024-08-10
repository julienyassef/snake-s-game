import React from 'react';
import { getScores } from '../../utils/LocalStorage';

const ScoreBoard: React.FC = () => {
  const scores = getScores();

  const getScoresByMode = (mode: string) => {
    return scores
      .filter(score => score.mode === mode)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const getBackgroundColor = (index: number) => {
    if (index === 0) return 'bg-[#FFD700]';  
    if (index === 1) return 'bg-[#C0C0C0]';  
    if (index === 2) return 'bg-[#B87333]';  
    return 'bg-gray-200';                   
};


  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#95C695] text-center">Classement</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {['lent', 'moyen', 'rapide'].map((mode) => (
          <div key={mode}>
            <h3 className="text-2xl font-semibold text-gray-900 capitalize mb-4 text-center">{mode}</h3>
            <ul className="list-none pl-0">
              {getScoresByMode(mode).map((scoreData, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-2 rounded mb-2 shadow-sm ${getBackgroundColor(index)}`}
                >
                  <span className="text-gray-800 font-medium mr-4">
                    {scoreData.player ? scoreData.player : "Joueur Inconnu"}
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {scoreData.score} points
                  </span>
                </li>
              ))}
              {getScoresByMode(mode).length === 0 && (
                <li className="text-gray-600 italic">Pas encore de scores.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
