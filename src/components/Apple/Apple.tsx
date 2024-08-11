/**
 * Dessine une pomme en utilisant un motif de "pixels".
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas sur lequel dessiner.
 * @param {number} x - La position X (en pixels) où commencer à dessiner la pomme.
 * @param {number} y - La position Y (en pixels) où commencer à dessiner la pomme.
 */
export const drawApple = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Définir la couleur de la pomme (noir pour imiter l'écran du Nokia 3310).
    ctx.fillStyle = 'black';

    // Taille d'un "pixel" de la pomme
    const pixelSize = 4;

    // Ligne 1 : Pixel au milieu
    ctx.fillRect(x + pixelSize, y, pixelSize, pixelSize); // (2e pixel sur la 1ère ligne)

    // Ligne 2 : Pixels sur les côtés
    ctx.fillRect(x, y + pixelSize, pixelSize, pixelSize); // (1er pixel sur la 2e ligne)
    ctx.fillRect(x + 2 * pixelSize, y + pixelSize, pixelSize, pixelSize); // (3e pixel sur la 2e ligne)

    // Ligne 3 : Pixel au milieu
    ctx.fillRect(x + pixelSize, y + 2 * pixelSize, pixelSize, pixelSize); // (2e pixel sur la 3e ligne)
};
