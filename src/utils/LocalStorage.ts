interface ScoreData {
    player: string;
    score: number;
    mode: string;
}

// Sauvegarder un score avec le mode de jeu
export const saveScore = (playerName: string, score: number, mode: string): void => {
    let scores: ScoreData[] = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push({ player: playerName, score: score, mode: mode });
    localStorage.setItem('scores', JSON.stringify(scores));
};

// Récupérer les scores
export const getScores = (): ScoreData[] => {
    return JSON.parse(localStorage.getItem('scores') || '[]');
};

// Supprimer tous les scores
export const clearScores = (): void => {
    localStorage.removeItem('scores');
};
