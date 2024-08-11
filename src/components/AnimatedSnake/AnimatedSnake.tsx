import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Interface représentant une partie du serpent avec des coordonnées x et y.
 */
interface SnakePart {
  x: number;
  y: number;
}

/**
 * Props pour le composant AnimatedSnake.
 * @property {number} initialLength - La longueur initiale du serpent.
 * @property {boolean} animate - Indique si le serpent doit être animé.
 */
interface AnimatedSnakeProps {
  initialLength: number;
  animate: boolean; 
}

/**
 * Composant AnimatedSnake qui dessine un serpent animé sur un canvas.
 * @param {AnimatedSnakeProps} props - Les props du composant.
 * @returns {JSX.Element | null} Un élément canvas ou null si l'animation est désactivée.
 */
const AnimatedSnake: React.FC<AnimatedSnakeProps> = ({ initialLength, animate }) => {
  // Position initiale aléatoire du serpent
  const startX = Math.floor(Math.random() * window.innerWidth);
  const startY = Math.floor(Math.random() * window.innerHeight);

  // État pour stocker les segments du serpent
  const [snake, setSnake] = useState<SnakePart[]>(
    Array.from({ length: initialLength }, (_, i) => ({
      x: startX - i * 10, // Aligne les segments horizontalement
      y: startY,          // Tous les segments ont la même position Y
    }))
  );

  // État pour gérer la direction du mouvement du serpent
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    Math.random() > 0.5 
      ? (Math.random() > 0.5 ? 'UP' : 'DOWN') 
      : (Math.random() > 0.5 ? 'LEFT' : 'RIGHT')
  );

  const [size] = useState(10); // Taille d'un segment du serpent
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Fonction pour déplacer le serpent dans la direction actuelle.
   * Modifie l'état du serpent en ajoutant un nouveau segment à la tête et en retirant un segment à la queue.
   * @callback moveSnake
   */
  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    // Déplacement du serpent selon la direction actuelle
    switch (direction) {
      case 'UP':
        head.y = (head.y - size + window.innerHeight) % window.innerHeight;
        break;
      case 'DOWN':
        head.y = (head.y + size + window.innerHeight) % window.innerHeight;
        break;
      case 'LEFT':
        head.x = (head.x - size + window.innerWidth) % window.innerWidth;
        break;
      case 'RIGHT':
        head.x = (head.x + size + window.innerWidth) % window.innerWidth;
        break;
    }

    newSnake.unshift(head);

    // Limite la longueur du serpent pour qu'il garde sa taille initiale
    if (newSnake.length > initialLength) {
      newSnake.pop();
    }

    setSnake(newSnake);

    // Changement aléatoire de direction
    if (Math.random() < 0.1) {
      const possibleDirections = ['UP', 'DOWN', 'LEFT', 'RIGHT'].filter(dir => dir !== direction);
      setDirection(possibleDirections[Math.floor(Math.random() * possibleDirections.length)] as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT');
    }
  }, [snake, direction, size, initialLength]);

  /**
   * Effet pour gérer l'animation du serpent.
   * Exécute un intervalle qui dessine et déplace le serpent sur le canvas.
   */
  useEffect(() => {
    if (!animate) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'white';
      snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, size, size);
        ctx.strokeRect(part.x, part.y, size, size);
      });
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [snake, moveSnake, size, animate]);

  // Si l'animation est désactivée, ne pas afficher le canvas
  if (!animate) return null;

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed top-0 left-0 w-full h-full z-0"
      data-testid="animated-snake-canvas"
    ></canvas>
  );
};

export default AnimatedSnake;
