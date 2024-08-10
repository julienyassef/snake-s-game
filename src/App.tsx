import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Score from './components/Score/Score';
import StartButton from './components/StartButton';

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

  const startGame = () => {
    setIsGameStarted(true);
    setStopGame(false);
  };

  // Fonction pour générer une position aléatoire
  const randomPosition = () => {
    return Math.floor(Math.random() * 29) * 10;
  };

  // Fonction pour créer une nouvelle pomme à une position aléatoire
  const creerPomme = useCallback(() => {
    const newPommeX = randomPosition();
    const newPommeY = randomPosition();
    setPommeX(newPommeX);
    setPommeY(newPommeY);
  }, []);

  useEffect(() => {
    creerPomme(); // Génère une position aléatoire pour la première pomme au démarrage du jeu
  }, [creerPomme]);

  const handleGameOver = () => {
    setStopGame(true);
    // alert('Game Over! Appuyez sur "OK" pour recommencer.');
    // window.location.reload();
  };

  const handleSnakeMove = (newSnake: SnakePart[]) => {
    setSnake(newSnake);
  };

  const handleAppleEaten = () => {
    setScore(score + 10);
    creerPomme(); // Génère une nouvelle position aléatoire pour la pomme après l'avoir mangée
  };

  const handleDirectionChange = useCallback((newVx: number, newVy: number) => {
    setVx(newVx);
    setVy(newVy);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Snake Game</h1>
      {!isGameStarted ? (
        <StartButton onStart={startGame} />
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
          />
          <Score score={score} />
        </>
      )}
    </div>
  );
};

export default App;
