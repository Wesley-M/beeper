import {DEFAULT_SPEED} from "../../settings";
import {Slider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export function SpeedSelector({ defSpeed, handleSpeedChange }) {
  const [speedFactor, setSpeedFactor] = useState(1);
  
  // The step of the slider
  const FACTOR_STEP = 0.5;

  // The step of speed when factor changes
  const FACTOR_SPEED_STEP = FACTOR_STEP * DEFAULT_SPEED;

  // Changes the speed based on a factor
  const toggleSpeed = (factor = 1) => {
    setSpeedFactor(factor);
    handleSpeedChange(DEFAULT_SPEED * factor);
  };

  // Set the default speed when the default changes
  useEffect(() => {
    const defFactor = ((defSpeed || DEFAULT_SPEED) - DEFAULT_SPEED) / FACTOR_SPEED_STEP;
    setSpeedFactor(defFactor);
    console.log("def speed change ", defSpeed);
  }, [defSpeed]);

  return (
      <>
        <Stack direction="row" width="30%" alignItems="center">
          <Typography
              sx={{
                width: '40%',
                minWidth: '100px',
                color: '#F1F1F1'
              }}
          >
            Speed
          </Typography>
          <Slider
              aria-label="Speed"
              valueLabelDisplay="auto"
              size="large"
              value={speedFactor}
              step={0.5}
              marks
              min={0.5}
              max={4}
              sx={{
                width: '60%',
                minWidth: '100px'
              }}
              onChange={(e) => toggleSpeed(Number(e.target.value))}
              valueLabelFormat={value => <div>{'x' + value}</div>}
          />
        </Stack>
      </>
  );
}