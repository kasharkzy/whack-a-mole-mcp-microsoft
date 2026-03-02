import React from 'react';
import './HitsDisplay.css';

interface HitsDisplayProps {
  hits: number;
}

const HitsDisplay: React.FC<HitsDisplayProps> = ({ hits }) => {
  return (
    <div className="hits-display">
      <span className="hits-label">Hits:</span>
      <span className="hits-value">{hits}</span>
    </div>
  );
};

export default HitsDisplay;
