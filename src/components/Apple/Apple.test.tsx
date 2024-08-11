import { drawApple } from './Apple';

describe('drawApple', () => {
    it('should draw the apple correctly', () => {
        const ctx = {
            fillStyle: '',
            fillRect: jest.fn(),
        } as unknown as CanvasRenderingContext2D;

        drawApple(ctx, 10, 20);

        expect(ctx.fillStyle).toBe('black');
        expect(ctx.fillRect).toHaveBeenCalledTimes(4);

        // Vérifie les appels à fillRect avec les bonnes coordonnées
        expect(ctx.fillRect).toHaveBeenCalledWith(14, 20, 4, 4);  // Pixel du milieu de la première ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(10, 24, 4, 4);  // Pixel de gauche de la deuxième ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(18, 24, 4, 4);  // Pixel de droite de la deuxième ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(14, 28, 4, 4);  // Pixel du milieu de la troisième ligne
    });

    it('should use the correct starting coordinates', () => {
        const ctx = {
            fillStyle: '',
            fillRect: jest.fn(),
        } as unknown as CanvasRenderingContext2D;

        drawApple(ctx, 30, 40);

        expect(ctx.fillRect).toHaveBeenCalledWith(34, 40, 4, 4);  // Pixel du milieu de la première ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(30, 44, 4, 4);  // Pixel de gauche de la deuxième ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(38, 44, 4, 4);  // Pixel de droite de la deuxième ligne
        expect(ctx.fillRect).toHaveBeenCalledWith(34, 48, 4, 4);  // Pixel du milieu de la troisième ligne
    });
});
