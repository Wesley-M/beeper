import Box from "@mui/material/Box";
import {useState} from "react";
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import {INSTRUMENT_COLOR} from "../settings";

export function InstrumentSelector({ onChange }) {
  const instruments = Object.keys(INSTRUMENT_COLOR);

  const [currIntrument, setCurrInstrument] = useState(0);

  const toggleInstrument = () => {
    onChange(instruments[(currIntrument + 1) % instruments.length]);
    setCurrInstrument(old => (old + 1) % instruments.length);
  }

  return (
      <Box sx={{ minWidth: 120 }}>
        <Button
            variant="contained"
            onClick={() => toggleInstrument()}
            size="large"
            startIcon={<RefreshIcon />}
            disableElevation
        >
          {instruments[currIntrument]}
        </Button>
      </Box>
  );
}