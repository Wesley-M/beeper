import * as React from 'react';
import {DEFAULT_SPEED, SPEED_FACTORS} from "../settings";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

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
      <>
        <Stack
            sx={{
              backgroundColor: "#168ad5",
              padding: "0.55em 1.2em",
              borderRadius: "0.3em",
              border: "1px solid #1a73e7cc",
              margin: "0.4em 0.4em"
            }}
            direction="row"
            spacing={1}
        >
          <Typography sx={{ textAlign: 'left' }}>Velocidade</Typography>
          <Stack direction="row">
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
          </Stack>
        </Stack>
      </>
  );
}