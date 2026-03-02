export interface MoleState {
  id: number;
  isActive: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'gameOver';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  score: number;
  hits: number;
  timeLeft: number;
  status: GameStatus;
  moles: MoleState[];
  difficulty: Difficulty;
}

export interface DifficultySettings {
  moleAppearInterval: number;
  moleVisibleTime: number;
  gameDuration: number;
  label: string;
  color: string;
}
