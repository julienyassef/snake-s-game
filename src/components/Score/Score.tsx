import React from 'react';

// Définition de l'interface pour les propriétés du composant Score.
// Cette interface indique que le composant Score doit recevoir une propriété `score` de type `number`.
interface ScoreProps {
  score: number; // Représente le score actuel à afficher
}

// Définition du composant Score en tant que composant fonctionnel React (React.FC).
// Il accepte un objet de propriétés conformes à l'interface `ScoreProps` en entrée.
const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    // Le composant retourne un div contenant le score formaté.
    <div className="mt-4">
      {/* Affichage du score avec une classe CSS pour le styliser. */}
      <span className="text-xl font-semibold">Score: {score}</span>
    </div>
  );
};

// Exportation du composant Score pour qu'il puisse être importé et utilisé dans d'autres fichiers.
export default Score;
