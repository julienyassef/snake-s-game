// Cette fonction dessine une pomme (un cercle) sur un canvas à des coordonnées spécifiques.
export const drawApple = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    
    // Définit la couleur de remplissage de la pomme (l'intérieur du cercle).
    ctx.fillStyle = 'red';
    
    // Définit la couleur du contour de la pomme (le bord extérieur du cercle).
    ctx.strokeStyle = 'darkred';
    
    // Commence un nouveau chemin de dessin sur le canvas.
    ctx.beginPath();
    
    // Dessine un cercle représentant la pomme :
    // - (x + 5, y + 5) : les coordonnées du centre du cercle.
    // - 5 : le rayon du cercle (le demi-diamètre), ici 5 pixels.
    // - 0 : l'angle de départ du dessin, ici 0 radians (début à droite du centre).
    // - 2 * Math.PI : l'angle de fin, ici un tour complet (360° ou 2π radians), ce qui dessine un cercle complet.
    ctx.arc(x + 5, y + 5, 5, 0, 2 * Math.PI);
    
    // Remplit l'intérieur du cercle avec la couleur définie par ctx.fillStyle (ici, rouge).
    ctx.fill();
    
    // Dessine le contour du cercle avec la couleur définie par ctx.strokeStyle (ici, rouge foncé).
    ctx.stroke();
};
