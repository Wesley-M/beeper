import * as React from 'react';
import {DEFAULT_SPEED, SPEED_FACTORS} from "../settings";
import {Slider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

export function SpeedSelector({ speed, handleSpeedChange }) {
  // Changes the speed based on a factor
  const toggleSpeed = (factor = 1) => {
    handleSpeedChange(DEFAULT_SPEED * factor);
  };

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
              defaultValue={1}
              valueLabelDisplay="auto"
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