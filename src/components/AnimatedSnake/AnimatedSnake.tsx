import React, { useState, useEffect, useCallback, useRef } from 'react';

interface SnakePart {
  x: number;
  y: number;
}

interface AnimatedSnakeProps {
  initialLength: number;
  animate: boolean; // Nouvelle prop pour contrôler l'animation
}

const AnimatedSnake: React.FC<AnimatedSnakeProps> = ({ initialLength, animate }) => {
  const startX = Math.floor(Math.random() * window.innerWidth); // Position initiale X
  const startY = Math.floor(Math.random() * window.innerHeight); // Position initiale Y
  const [snake, setSnake] = useState<SnakePart[]>(
    Array.from({ length: initialLength }, (_, i) => ({
      x: startX - i * 10, // Aligne les segments horizontalement
      y: startY,          // Tous les segments ont la même position Y
    }))
  );
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    Math.random() > 0.5 ? (Math.random() > 0.5 ? 'UP' : 'DOWN') : (Math.random() > 0.5 ? 'LEFT' : 'RIGHT')
  );
  const [size] = useState(10); // Taille des segments du serpent
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    // Déplacement du serpent en fonction de la direction
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

    newSnake.unshift(head); // Ajoute la nouvelle tête au début du tableau

    // Limite la longueur du serpent pour qu'il garde sa taille initiale
    if (newSnake.length > initialLength) {
      newSnake.pop(); // Supprime le dernier segment pour maintenir la longueur
    }

    setSnake(newSnake);

    // Change de direction de manière aléatoire
    if (Math.random() < 0.1) { // 10% de chance de changer de direction à chaque mouvement
      const possibleDirections = ['UP', 'DOWN', 'LEFT', 'RIGHT'].filter(dir => dir !== direction);
      setDirection(possibleDirections[Math.floor(Math.random() * possibleDirections.length)] as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT');
    }
  }, [snake, direction, size, initialLength]);

  useEffect(() => {
    if (!animate) return;  // Si `animate` est false, ne pas lancer l'animation

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // Efface tout le canvas
      ctx.fillStyle = 'black'; // Couleur de remplissage du serpent
      ctx.strokeStyle = 'white'; // Couleur de contour du serpent
      snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, size, size); // Dessine le segment
        ctx.strokeRect(part.x, part.y, size, size); // Dessine le contour
      });
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [snake, moveSnake, size, animate]);

  // Si `animate` est false, ne pas afficher le canvas
  if (!animate) return null;

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default AnimatedSnake;
