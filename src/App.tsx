import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Score from './components/Score/Score';
import StartButton from './components/StartButton/StartButton';
import LevelSelector from './components/LevelSelector/LevelSelector';
import AnimatedSnake from './components/AnimatedSnake/AnimatedSnake';
import ModalGameOver from './components/ModalGameOver/ModalGameOver'; // Import du nouveau composant

interface SnakePart {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [snake, setSnake] = useState<SnakePart[]>([
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ]);
  const [vx, setVx] = useState(10);
  const [vy, setVy] = useState(0);
  const [pommeX, setPommeX] = useState(0);
  const [pommeY, setPommeY] = useState(0);
  const [score, setScore] = useState(0);
  const [stopGame, setStopGame] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage du modal
  const [speed, setSpeed] = useState(100); // Vitesse par défaut
  const [animateSnakes, setAnimateSnakes] = useState(true); // Pour contrôler l'animation des serpents

  const startGame = () => {
    // Taille du canvas
    const canvasSize = 300; // Ajustez en fonction de la taille réelle de votre canvas
  
    // Calculer la position initiale pour que le serpent soit centré
    const initialX = canvasSize / 2;
    const initialY = canvasSize / 2;
  
    // Réinitialiser le serpent avec la position centrale
    setSnake([
      { x: initialX, y: initialY },
      { x: initialX - 10, y: initialY },
      { x: initialX - 20, y: initialY },
      { x: initialX - 30, y: initialY },
    ]);
  
    // Réinitialiser la direction (à droite par défaut)
    setVx(10);
    setVy(0);
  
    // Réinitialiser la pomme à une nouvelle position aléatoire
    creerPomme();
  
    // Réinitialiser le score
    setScore(0);
  
    // Relancer le jeu
    setStopGame(false);
    setAnimateSnakes(false);
    setShowModal(false);  // Fermer le modal si le jeu redémarre
    setIsGameStarted(true);
  };
  
  

  const selectLevel = (level: number) => {
    if (level === 1) setSpeed(150); // Lent
    if (level === 2) setSpeed(100); // Moyen 
    if (level === 3) setSpeed(50); // Rapide
    setShowModal(false);  // Fermer le modal lorsque le niveau est changé
  };

  const randomPosition = () => {
    return Math.floor(Math.random() * 29) * 10;
  };

  const creerPomme = useCallback(() => {
    const newPommeX = randomPosition();
    const newPommeY = randomPosition();
    setPommeX(newPommeX);
    setPommeY(newPommeY);
  }, []);

  useEffect(() => {
    creerPomme();
  }, [creerPomme]);

  const handleGameOver = () => {
    setStopGame(true);
    setShowModal(true);  // Afficher le modal à la fin du jeu
  };

  const handleSnakeMove = (newSnake: SnakePart[]) => {
    setSnake(newSnake);
  };

  const goToLevelSelection = () => {
    setIsGameStarted(false); // Retour au menu de sélection du niveau
    setStopGame(true);
    setAnimateSnakes(true);  // Redémarrer les animations des serpents
    setShowModal(false);
  };

  const handleAppleEaten = () => {
    setScore(score + 10);
    creerPomme();
  };

  const handleDirectionChange = useCallback((newVx: number, newVy: number) => {
    setVx(newVx);
    setVy(newVy);
  }, []);

  const length1 = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
  const length2 = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
  const length3 = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0 z-0">
        <AnimatedSnake initialLength={length1} animate={animateSnakes} />
        <AnimatedSnake initialLength={length2} animate={animateSnakes} />
        <AnimatedSnake initialLength={length3} animate={animateSnakes} />
      </div>
      
      <h1 className="text-4xl font-bold mb-6 z-10">Snake Game</h1>
      {!isGameStarted ? (
        <div className="flex flex-col items-center z-10">
          <LevelSelector onSelectLevel={selectLevel} />
          <StartButton onStart={startGame} />
        </div>
      ) : (
        <>
          <GameBoard
            snake={snake}
            pommeX={pommeX}
            pommeY={pommeY}
            vx={vx}
            vy={vy}
            stopGame={stopGame}
            onGameOver={handleGameOver}
            onSnakeMove={handleSnakeMove}
            onAppleEaten={handleAppleEaten}
            onDirectionChange={handleDirectionChange}
            speed={speed}
          />
          <Score score={score} />
        </>
      )}

      {showModal && (
        <ModalGameOver
          score={score}
          onRestart={startGame}
          onChangeLevel={goToLevelSelection}
        />
      )}
    </div>
  );
};

export default App;
