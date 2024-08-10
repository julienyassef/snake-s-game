// Définition d'une interface pour représenter une partie du serpent.
// Chaque partie a des coordonnées x et y.
interface SnakePart {
    x: number; // Position horizontale de la partie du serpent
    y: number; // Position verticale de la partie du serpent
}

// Fonction pour dessiner le serpent sur un canvas.
// Elle prend en entrée le contexte du canvas (ctx) et un tableau représentant les parties du serpent.
export const drawSnake = (ctx: CanvasRenderingContext2D, snake: SnakePart[]) => {
  
    // Définir la couleur de remplissage pour chaque partie du serpent.
    // Ici, la couleur est un vert vif (#00fe14).
    ctx.fillStyle = 'black';
  
    // Définir la couleur du contour pour chaque partie du serpent.
    // Ici, la couleur est noire.
    ctx.strokeStyle = '#94CA94';
  
    // Pour chaque partie du serpent dans le tableau 'snake', dessiner un carré sur le canvas.
    snake.forEach((part) => {
        // Dessiner un rectangle rempli à la position (part.x, part.y) avec une taille de 10x10 pixels.
        ctx.fillRect(part.x, part.y, 10, 10);
      
        // Dessiner un contour autour du rectangle à la position (part.x, part.y) avec une taille de 10x10 pixels.
        ctx.strokeRect(part.x, part.y, 10, 10);
    });
};
