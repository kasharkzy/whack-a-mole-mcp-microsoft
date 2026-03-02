import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import HitsDisplay from './components/HitsDisplay';
import Timer from './components/Timer';
import DifficultySelector from './components/DifficultySelector';
import type { GameStatus, MoleState, Difficulty, DifficultySettings } from './types';
import './Game.css';

const TOTAL_HOLES = 9;

const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: {
    moleAppearInterval: 1200,
    moleVisibleTime: 1500,
    gameDuration: 45,
    label: 'Easy',
    color: '#4CAF50',
  },
  medium: {
    moleAppearInterval: 800,
    moleVisibleTime: 1000,
    gameDuration: 30,
    label: 'Medium',
    color: '#FF9800',
  },
  hard: {
    moleAppearInterval: 500,
    moleVisibleTime: 700,
    gameDuration: 30,
    label: 'Hard',
    color: '#F44336',
  },
};

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [moles, setMoles] = useState<MoleState[]>(
    Array.from({ length: TOTAL_HOLES }, (_, i) => ({ id: i, isActive: false }))
  );

  const currentSettings = DIFFICULTY_SETTINGS[difficulty];

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  // Mole spawning logic
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const spawnMole = () => {
      const randomIndex = Math.floor(Math.random() * TOTAL_HOLES);
      
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        if (!newMoles[randomIndex].isActive) {
          newMoles[randomIndex] = { ...newMoles[randomIndex], isActive: true };
        }
        return newMoles;
      });

      // Hide the mole after visible time
      setTimeout(() => {
        setMoles((prevMoles) => {
          const newMoles = [...prevMoles];
          newMoles[randomIndex] = { ...newMoles[randomIndex], isActive: false };
          return newMoles;
        });
      }, currentSettings.moleVisibleTime);
    };

    const interval = setInterval(spawnMole, currentSettings.moleAppearInterval);
    return () => clearInterval(interval);
  }, [gameStatus, currentSettings]);

  const handleWhack = useCallback((moleId: number) => {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles];
      if (newMoles[moleId].isActive) {
        newMoles[moleId] = { ...newMoles[moleId], isActive: false };
        setScore((prev) => prev + 1);
        setHits((prev) => {
          const newHits = prev + 1;
          console.log(`[Whack-a-Mole] Hit registered on mole ${moleId}. Total hits: ${newHits}`);
          return newHits;
        });
      }
      return newMoles;
    });
  }, []);

  const startGame = () => {
    setScore(0);
    setHits(0);
    setTimeLeft(currentSettings.gameDuration);
    setGameStatus('playing');
    setMoles(Array.from({ length: TOTAL_HOLES }, (_, i) => ({ id: i, isActive: false })));
  };

  const restartGame = () => {
    setGameStatus('idle');
    setScore(0);
    setHits(0);
    setTimeLeft(currentSettings.gameDuration);
    setMoles(Array.from({ length: TOTAL_HOLES }, (_, i) => ({ id: i, isActive: false })));
  };

  return (
    <div className="game-container">
      <h1 className="game-title">🦫 Whack-a-Mole 🦫</h1>
      
      {gameStatus === 'playing' && (
        <div className="game-info">
          <ScoreDisplay score={score} />
          <HitsDisplay hits={hits} />
          <div className="difficulty-badge" style={{ background: currentSettings.color }}>
            {currentSettings.label}
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      )}

      {gameStatus === 'idle' && (
        <div className="game-overlay">
          <div className="start-screen">
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={setDifficulty}
            />
            <button className="game-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameStatus === 'gameOver' && (
        <div className="game-overlay">
          <div className="game-over">
            <h2>Game Over!</h2>
            <p className="difficulty-completed">
              Difficulty: <span style={{ color: currentSettings.color }}>{currentSettings.label}</span>
            </p>
            <p className="final-score">Final Score: {score}</p>
            <HitsDisplay hits={hits} />
            <button className="game-button" onClick={restartGame}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <GameBoard moles={moles} onWhack={handleWhack} />
    </div>
  );
};

export default Game;
