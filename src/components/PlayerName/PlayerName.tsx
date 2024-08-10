import React from 'react';

interface PlayerNameProps {
  playerName: string;
}

const PlayerName: React.FC<PlayerNameProps> = ({ playerName }) => {
  return (
    <div className="mt-2 mb-4">
      <span className=" text-xl font-semibold">Joueur: {playerName}</span>
    </div>
  );
};

export default PlayerName;
