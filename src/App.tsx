import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Score from './components/Score/Score';
import StartButton from './components/StartButton/StartButton';
import LevelSelector from './components/LevelSelector/LevelSelector';
import AnimatedSnake from './components/AnimatedSnake/AnimatedSnake';
import ModalGameOver from './components/ModalGameOver/ModalGameOver'; 

interface SnakePart {
  x: number;
  y: number;
  visible?: boolean;
}

const App: React.FC = () => {
  const [snake, setSnake] = useState<SnakePart[]>([
    { x: 140, y: 150, visible: true },
    { x: 130, y: 150, visible: true },
    { x: 120, y: 150, visible: true },
    { x: 110, y: 150, visible: true },
  ]);
  const [vx, setVx] = useState(10);
  const [vy, setVy] = useState(0);
  const [pommeX, setPommeX] = useState(0);
  const [pommeY, setPommeY] = useState(0);
  const [score, setScore] = useState(0);
  const [stopGame, setStopGame] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [animateSnakes, setAnimateSnakes] = useState(true);

  const startGame = () => {
    const canvasSize = 300; 
    const initialX = canvasSize / 2;
    const initialY = canvasSize / 2;
    setSnake([
      { x: initialX, y: initialY, visible: true },
      { x: initialX - 10, y: initialY, visible: true },
      { x: initialX - 20, y: initialY, visible: true },
      { x: initialX - 30, y: initialY, visible: true },
    ]);
    setVx(10);
    setVy(0);
    creerPomme();
    setScore(0);
    setStopGame(false);
    setAnimateSnakes(false);
    setShowModal(false); 
    setIsGameStarted(true);
  };

  const selectLevel = (level: number) => {
    if (level === 1) setSpeed(150); 
    if (level === 2) setSpeed(100); 
    if (level === 3) setSpeed(50); 
    setShowModal(false);  
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

    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      setSnake((prevSnake) =>
        prevSnake.map((part) => ({
          ...part,
          visible: !part.visible,
        }))
      );
      blinkCount++;
      if (blinkCount >= 6) { 
        clearInterval(blinkInterval);
        setShowModal(true);
      }
    }, 200); 
  };

  const handleSnakeMove = (newSnake: SnakePart[]) => {
    setSnake(newSnake);
  };

  const goToLevelSelection = () => {
    setIsGameStarted(false); 
    setStopGame(true);
    setAnimateSnakes(true); 
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
