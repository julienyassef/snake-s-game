import React from 'react';

interface LevelSelectorProps {
  onSelectLevel: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel }) => {
  return (
    <div className="mt-4 mb-4">
      <label 
        htmlFor="level" 
        className="block mb-2 text-lg font-medium text-[#95C695]" // Utilisation de la couleur #95C695
      >
        Choisissez un niveau :
      </label>
      <select
        id="level"
        className="p-2 bg-gray-100 border border-gray-300 text-[#95C695] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
        onChange={(e) => onSelectLevel(Number(e.target.value))}
      >
        <option value={1} className="text-[#95C695]">Lent</option>
        <option value={2} className="text-[#95C695]">Moyen</option>
        <option value={3} className="text-[#95C695]">Rapide</option>
      </select>
    </div>
  );
};

export default LevelSelector;
