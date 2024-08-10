import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Score from './components/Score/Score';
import StartButton from './components/StartButton/StartButton';
import LevelSelector from './components/LevelSelector/LevelSelector';
import AnimatedSnake from './components/AnimatedSnake/AnimatedSnake';

interface SnakePart {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  const [speed, setSpeed] = useState(100); // Vitesse par défaut
  const [animateSnakes, setAnimateSnakes] = useState(true);


  // Fonction pour démarrer le jeu
  const startGame = () => {
    setIsGameStarted(true);
    setStopGame(false);
    setAnimateSnakes(false);
  };

  // Fonction pour sélectionner le niveau et définir la vitesse correspondante
  const selectLevel = (level: number) => {
    if (level === 1) setSpeed(150); // Lent
    if (level === 2) setSpeed(100); // Moyen 
    if (level === 3) setSpeed(50); // Rapide
  };

  // Fonction pour générer une position aléatoire pour la pomme
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

  // Fonction appelée en cas de fin de jeu
  const handleGameOver = () => {
    setStopGame(true);
  };

  // Fonction pour mettre à jour la position du serpent
  const handleSnakeMove = (newSnake: SnakePart[]) => {
    setSnake(newSnake);
  };

  // Fonction appelée lorsque la pomme est mangée par le serpent
  const handleAppleEaten = () => {
    setScore(score + 10);
    creerPomme(); // Génère une nouvelle position aléatoire pour la pomme après l'avoir mangée
  };

  // Fonction pour changer la direction du serpent
  const handleDirectionChange = useCallback((newVx: number, newVy: number) => {
    setVx(newVx);
    setVy(newVy);
  }, []);

  // Générer des longueurs aléatoires pour chaque serpent
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
            speed={speed} // Vitesse choisie passée au GameBoard
          />
          <Score score={score} />
        </>
      )}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" // z-0 place le canvas derrière tout, pointer-events-none désactive les interactions
      ></canvas>
    </div>
  );
};

export default App;
