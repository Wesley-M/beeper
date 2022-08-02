import * as React from 'react';
import {DEFAULT_SPEED, SPEED_FACTORS} from "../settings";

export function SpeedSelector({ speed, handleSpeedChange }) {
  // Changes the speed based on a factor
  const toggleSpeed = (factor = 1) => {
    handleSpeedChange(DEFAULT_SPEED * factor);
  };

  // Checks if speed is selected
  const isVelSelected = (vel) => {
    return DEFAULT_SPEED * vel == speed;
  };

  return (
      <div className="vel-container">
        <p className="vel-label">VELOCIDADE</p>
        <div className="vel-btn-container">
          {SPEED_FACTORS.map((factor) => (
              <button
                  className="vel-btn"
                  style={{
                    backgroundColor: isVelSelected(factor)
                        ? "rgba(11,107,234,0.8)"
                        : "white",
                    color: isVelSelected(factor) ? "white" : "#1a73e7cc",
                  }}
                  onClick={() => toggleSpeed(factor)}
              >
                x{factor}
              </button>
          ))}
        </div>
      </div>
  );
}