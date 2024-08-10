import React, { useRef, useEffect, useCallback } from 'react';
// Importation des fonctions pour dessiner le serpent et la pomme
import { drawSnake } from '../Snake/Snake';
import { drawApple } from '../Apple/Apple';

// Interface définissant une partie du serpent avec des coordonnées x et y
interface SnakePart {
  x: number;
  y: number;
}

// Interface pour les props du composant GameBoard
interface GameBoardProps {
  snake: SnakePart[]; // Tableau représentant les parties du serpent
  pommeX: number; // Position X de la pomme
  pommeY: number; // Position Y de la pomme
  vx: number; // Vitesse sur l'axe X (direction)
  vy: number; // Vitesse sur l'axe Y (direction)
  stopGame: boolean; // Indique si le jeu est arrêté
  onGameOver: () => void; // Fonction callback déclenchée en cas de fin de jeu
  onSnakeMove: (newSnake: SnakePart[]) => void; // Fonction callback pour mettre à jour le serpent
  onAppleEaten: () => void; // Fonction callback déclenchée quand la pomme est mangée
  onDirectionChange: (vx: number, vy: number) => void; // Fonction callback pour changer la direction du serpent
}

// Composant GameBoard : gère le canvas où le jeu Snake est rendu
const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  pommeX,
  pommeY,
  vx,
  vy,
  stopGame,
  onGameOver,
  onSnakeMove,
  onAppleEaten,
  onDirectionChange,
}) => {
  // Référence pour accéder au canvas HTML
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasSize = 300; // Taille du canvas en pixels (300x300)
  const cellSize = 10; // Taille d'une cellule en pixels (chaque segment du serpent ou de la pomme)

  // Fonction pour vérifier si le jeu est terminé (collision avec les murs ou le serpent lui-même)
  const finDuJeu = useCallback(
    (head: SnakePart): boolean => {
      const snakeSansTete = snake.slice(1); // Exclut la tête du serpent pour vérifier les collisions
      let mordu = snakeSansTete.some((part) => part.x === head.x && part.y === head.y); // Vérifie si le serpent se mord la queue

      // Vérifie si la tête touche un des murs
      const toucheMurGauche = head.x < 0;
      const toucheMurDroite = head.x >= canvasSize;
      const toucheMurTop = head.y < 0;
      const toucheMurBottom = head.y >= canvasSize;

      // Retourne true si une des conditions de fin est remplie
      return mordu || toucheMurGauche || toucheMurDroite || toucheMurTop || toucheMurBottom;
    },
    [snake, canvasSize] // Dépendances : ces valeurs sont utilisées dans la fonction
  );

  // Fonction pour déplacer le serpent d'une étape
  const faireAvancerSerpent = useCallback(() => {
    const newSnake = [...snake]; // Copie du tableau représentant le serpent
    const head: SnakePart = { x: newSnake[0].x + vx, y: newSnake[0].y + vy }; // Calcule la nouvelle position de la tête
    newSnake.unshift(head); // Ajoute la nouvelle tête au début du tableau

    // Vérifie si le jeu est terminé
    if (finDuJeu(head)) {
      onGameOver(); // Déclenche la fin du jeu
      return;
    }

    // Vérifie si le serpent a mangé la pomme
    if (head.x === pommeX && head.y === pommeY) {
      onAppleEaten(); // Déclenche l'événement de la pomme mangée
    } else {
      newSnake.pop(); // Supprime la dernière partie du serpent pour le maintenir à la même longueur
    }

    onSnakeMove(newSnake); // Met à jour l'état du serpent avec sa nouvelle position
  }, [snake, vx, vy, pommeX, pommeY, finDuJeu, onGameOver, onSnakeMove, onAppleEaten]); // Dépendances

  // Fonction pour gérer le changement de direction en réponse aux touches du clavier
  const changerDirection = useCallback(
    (event: KeyboardEvent): void => {
      const FLECHE_GAUCHE = 37;
      const FLECHE_DROITE = 39;
      const FLECHE_ENHAUT = 38;
      const FLECHE_ENBAS = 40;

      const direction = event.keyCode;

      // Vérifie que la nouvelle direction ne permet pas au serpent de faire demi-tour sur lui-même
      const monter = vy === -cellSize;
      const descendre = vy === cellSize;
      const adroite = vx === cellSize;
      const agauche = vx === -cellSize;

      // Change la direction en fonction de la touche pressée
      if (direction === FLECHE_GAUCHE && !adroite) {
        onDirectionChange(-cellSize, 0);
      }
      if (direction === FLECHE_ENHAUT && !descendre) {
        onDirectionChange(0, -cellSize);
      }
      if (direction === FLECHE_DROITE && !agauche) {
        onDirectionChange(cellSize, 0);
      }
      if (direction === FLECHE_ENBAS && !monter) {
        onDirectionChange(0, cellSize);
      }
    },
    [vx, vy, onDirectionChange] // Dépendances
  );

  // Effet pour gérer l'animation du jeu : avance le serpent et redessine le canvas à intervalles réguliers
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d'); // Récupère le contexte 2D du canvas
    if (!ctx) return;

    // Intervalle pour rafraîchir le canvas toutes les 100ms
    const interval = setInterval(() => {
      if (!stopGame) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasSize, canvasSize); // Efface le canvas en le remplissant de blanc
        ctx.strokeRect(0, 0, canvasSize, canvasSize); // Trace un contour autour du canvas

        faireAvancerSerpent(); // Déplace le serpent d'une étape
        drawSnake(ctx, snake); // Dessine le serpent sur le canvas
        drawApple(ctx, pommeX, pommeY); // Dessine la pomme sur le canvas
      }
    }, 100);

    // Nettoie l'intervalle lorsqu'il n'est plus nécessaire (nettoyage de l'effet)
    return () => clearInterval(interval);
  }, [stopGame, snake, pommeX, pommeY, vx, vy, faireAvancerSerpent]); // Dépendances

  // Effet pour écouter les événements clavier pour le changement de direction
  useEffect(() => {
    window.addEventListener('keydown', changerDirection); // Ajoute l'écouteur d'événements
    return () => window.removeEventListener('keydown', changerDirection); // Retire l'écouteur lors du démontage
  }, [changerDirection]); // Dépendances

  // Retourne l'élément canvas où le jeu est rendu
  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="border-4 border-black"></canvas>;
};

export default GameBoard;
