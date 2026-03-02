import React from 'react';
import './HitsCard.css';

const MAX_HITS = 12;

interface HitsCardProps {
  /** Number of consecutive hits in the current streak (0–12+) */
  consecutiveHits: number;
}

const HitsCard: React.FC<HitsCardProps> = ({ consecutiveHits }) => {
  const filled = Math.min(consecutiveHits, MAX_HITS);

  return (
    <div className="hits-card" aria-label={`Consecutive hits: ${consecutiveHits}`}>
      <span className="hits-card__label">🔥 Streak</span>
      <div className="hits-card__sequence" role="img" aria-hidden="true">
        {Array.from({ length: MAX_HITS }, (_, i) => (
          <span
            key={i}
            className={`hits-card__dot ${i < filled ? 'hits-card__dot--filled' : ''} ${consecutiveHits >= MAX_HITS ? 'hits-card__dot--max' : ''}`}
          />
        ))}
      </div>
      <span className="hits-card__count">{consecutiveHits}x</span>
    </div>
  );
};

export default HitsCard;
