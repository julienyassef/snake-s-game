import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  const [stopGame, setStopGame] = useState(false);
  const [bugDirection, setBugDirection] = useState(false);

  const random = useCallback((): number => {
    return Math.round((Math.random() * 290) / 10) * 10;
  }, []);

  const creerPomme = useCallback((): void => {
    let x = random();
    let y = random();
    setPommeX(x);
    setPommeY(y);
  }, [random]);

  const nettoieCanvas = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, 300, 300);
    ctx.strokeRect(0, 0, 300, 300);
  };

  const dessineLesMorceaux = (ctx: CanvasRenderingContext2D, morceau: SnakePart): void => {
    ctx.fillStyle = '#00fe14';
    ctx.strokeStyle = 'black';
    ctx.fillRect(morceau.x, morceau.y, 10, 10);
    ctx.strokeRect(morceau.x, morceau.y, 10, 10);
  };

  const dessineLeSerpent = useCallback((ctx: CanvasRenderingContext2D): void => {
    snake.forEach((morceau) => dessineLesMorceaux(ctx, morceau));
  }, [snake]);

  const dessinePomme = useCallback(
    (ctx: CanvasRenderingContext2D): void => {
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'darkred';
      ctx.beginPath();
      ctx.arc(pommeX + 5, pommeY + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    },
    [pommeX, pommeY]
  );

  const finDuJeu = useCallback((head: SnakePart): boolean => {
    const snakeSansTete = snake.slice(1);
    let mordu = snakeSansTete.some((morceau) => morceau.x === head.x && morceau.y === head.y);

    const toucheMurGauche = head.x < 0;
    const toucheMurDroite = head.x >= 300;
    const toucheMurTop = head.y < 0;
    const toucheMurBottom = head.y >= 300;

    return mordu || toucheMurGauche || toucheMurDroite || toucheMurTop || toucheMurBottom;
  }, [snake]);

  const recommencer = useCallback((): void => {
    alert('Game Over! Appuyez sur "OK" pour recommencer.');
    window.location.reload();
  }, []);

  const faireAvancerSerpent = useCallback(
    (ctx: CanvasRenderingContext2D): void => {
      const newSnake = [...snake];
      const head: SnakePart = { x: newSnake[0].x + vx, y: newSnake[0].y + vy };
      newSnake.unshift(head);

      if (finDuJeu(head)) {
        setStopGame(true);
        recommencer();
        return;
      }

      const serpentMangePomme = head.x === pommeX && head.y === pommeY;

      if (serpentMangePomme) {
        setScore(score + 10);
        creerPomme();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    },
    [snake, vx, vy, pommeX, pommeY, score, finDuJeu, recommencer, creerPomme]
  );

  const changerDirection = useCallback(
    (event: KeyboardEvent): void => {
      if (bugDirection) return;
      setBugDirection(true);

      const FLECHE_GAUCHE = 37;
      const FLECHE_DROITE = 39;
      const FLECHE_ENHAUT = 38;
      const FLECHE_ENBAS = 40;

      const direction = event.keyCode;

      const monter = vy === -10;
      const descendre = vy === 10;
      const adroite = vx === 10;
      const agauche = vx === -10;

      if (direction === FLECHE_GAUCHE && !adroite) {
        setVx(-10);
        setVy(0);
      }
      if (direction === FLECHE_ENHAUT && !descendre) {
        setVx(0);
        setVy(-10);
      }
      if (direction === FLECHE_DROITE && !agauche) {
        setVx(10);
        setVy(0);
      }
      if (direction === FLECHE_ENBAS && !monter) {
        setVx(0);
        setVy(10);
      }
    },
    [vx, vy, bugDirection]
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      if (!stopGame) {
        setBugDirection(false);
        nettoieCanvas(ctx);
        dessinePomme(ctx);
        faireAvancerSerpent(ctx);
        dessineLeSerpent(ctx);
      }
    }, 100);

    if (pommeX === 0 && pommeY === 0) {
      creerPomme();
    }

    window.addEventListener('keydown', changerDirection);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', changerDirection);
    };
  }, [stopGame, vx, vy, snake, pommeX, pommeY, changerDirection, creerPomme, dessineLeSerpent, dessinePomme, faireAvancerSerpent]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Snake Game</h1>
      <canvas ref={canvasRef} width="300" height="300" className="border-4 border-black"></canvas>
      <div className="mt-4">
        <span className="text-xl font-semibold">Score: {score}</span>
      </div>
    </div>
  );
};

export default App;
