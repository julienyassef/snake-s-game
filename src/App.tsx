import React, { useState, useEffect, useCallback } from 'react';
import { saveScore } from './utils/LocalStorage';
import GameBoard from './components/GameBoard/GameBoard';
import Score from './components/Score/Score';
import PlayerName from './components/PlayerName/PlayerName';
import StartButton from './components/StartButton/StartButton';
import LevelSelector from './components/LevelSelector/LevelSelector';
import AnimatedSnake from './components/AnimatedSnake/AnimatedSnake';
import ModalGameOver from './components/ModalGameOver/ModalGameOver';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import NameValidationModal from './components/NameValidationModal/NameValidationModal'; 
import ModeDisplay from './components/ModeDisplay/ModeDisplay';
import LogoJY from './components/Logo/LogoJy';


interface SnakePart {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [showNameValidationModal, setShowNameValidationModal] = useState(false);
  const [mode, setMode] = useState('lent'); 

  
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
  const [showModal, setShowModal] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false); // État pour afficher le tableau des scores
  const [speed, setSpeed] = useState(150); // Vitesse par défaut
  const [animateSnakes, setAnimateSnakes] = useState(true); // Pour contrôler l'animation des serpents

  const startGame = () => {
    if (playerName.trim().length < 3 || playerName.trim().length > 12) {
      setShowNameValidationModal(true);
      return;
    }  

    const canvasSize = 300;
    const initialX = canvasSize / 2;
    const initialY = canvasSize / 2;

    setSnake([
      { x: initialX, y: initialY },
      { x: initialX - 10, y: initialY },
      { x: initialX - 20, y: initialY },
      { x: initialX - 30, y: initialY },
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
    let selectedMode = 'lent';
    if (level === 1) {
      setSpeed(150);
      selectedMode = 'lent';
    }
    if (level === 2) {
      setSpeed(100);
      selectedMode = 'moyen';
    }
    if (level === 3) {
      setSpeed(50);
      selectedMode = 'rapide';
    }
    setMode(selectedMode); 
    setShowModal(false);
  };

  const speedToMode = (speed: number): string => {
    if (speed === 150) return 'lent';
    if (speed === 100) return 'moyen';
    return 'rapide';
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
    saveScore(playerName, score, speedToMode(speed));
    setShowModal(true);
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
    <div className="relative flex flex-col items-center justify-center h-screen bg-white">
      <div className="absolute inset-0 z-0">
        <AnimatedSnake initialLength={length1} animate={animateSnakes} />
        <AnimatedSnake initialLength={length2} animate={animateSnakes} />
        <AnimatedSnake initialLength={length3} animate={animateSnakes} />
      </div>

      <button
        className="absolute bottom-4 left-4 flex items-center text-yellow-500 font-bold py-2 px-4 z-10 bg-transparent transition-transform transform hover:scale-110 hover:text-white hover:bg-yellow-500 hover:shadow-lg"
        onClick={() => setShowScoreBoard(true)}
      >
        Voir le Classement
      </button>


      <h1 className="text-4xl font-bold mb-6 z-10">Snake Game</h1>
      {!isGameStarted ? (
        <div className="flex flex-col items-center z-10">
           <input
            type="text"
            placeholder="Entrez votre nom"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded text-[#95C695] focus:outline-none focus:ring-2 focus:ring-[#95C695]"
          />
          <LevelSelector onSelectLevel={selectLevel} />
          <StartButton onStart={startGame} />
        </div>
      ) : (
        <>
          <PlayerName playerName={playerName} />
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
          <div className="flex items-center justify-between w-[300px] px-4">
            <Score score={score} />
            <ModeDisplay mode={mode}/>
          </div>
        </>
      )}

      {showNameValidationModal && (
        <NameValidationModal onClose={() => setShowNameValidationModal(false)} />
      )}

      {showScoreBoard && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <ScoreBoard />
            <button
              className="mt-4 bg-[#95C695] text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowScoreBoard(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <ModalGameOver
          score={score}
          onRestart={startGame}
          onChangeLevel={goToLevelSelection}
        />
      )}

    <a
      href="https://julienyassef.fr/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-6 right-6"
    >
      <LogoJY />
    </a>
    </div>
  );
};

export default App;
