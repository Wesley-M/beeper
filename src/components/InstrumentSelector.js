import Box from "@mui/material/Box";
import {useState} from "react";
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import {INSTRUMENT_COLOR} from "../settings";

export function InstrumentSelector({ onChange, synth, ...other }) {
  const instruments = Object.keys(INSTRUMENT_COLOR);

  const [currIntrument, setCurrInstrument] = useState(0);

  const toggleInstrument = () => {
    const next = instruments[(currIntrument + 1) % instruments.length];
    synth.getSynth(next).triggerAttackRelease("C#4", '8n');
    onChange(next);
    setCurrInstrument(old => (old + 1) % instruments.length);
  }

  return (
      <Button
          variant="contained"
          onClick={() => toggleInstrument()}
          size="large"
          startIcon={<RefreshIcon />}
          disableElevation
          {...other}
      >
        {instruments[currIntrument]}
      </Button>
  );
}