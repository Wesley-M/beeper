import Box from "@mui/material/Box";
import {useState} from "react";
import Button from "@mui/material/Button";
import {INSTRUMENT_COLOR, INSTRUMENT_ICON, INSTRUMENT_NAME} from "../settings";
import {Stack} from "@mui/material";

export function InstrumentSelector({ onChange, synth, ...other }) {
  const instruments = Object.keys(INSTRUMENT_COLOR);

  const [currIntrument, setCurrInstrument] = useState(0);

  const toggleInstrument = () => {
    const next = instruments[(currIntrument + 1) % instruments.length];
    synth.getSynth(next).triggerAttackRelease("C#4", '8n');
    onChange(next);
    setCurrInstrument(old => (old + 1) % instruments.length);
  }

  const Icon = INSTRUMENT_ICON[instruments[currIntrument]]

  return (
      <Button
          variant="contained"
          onClick={() => toggleInstrument()}
          size="large"
          disableElevation
          sx={{
            textTransform: 'capitalize',
            backgroundColor: 'transparent',
            opacity: 0.7,
            "&:hover": {
              backgroundColor: `${INSTRUMENT_COLOR[instruments[currIntrument]]}11`,
              opacity: 1
            }
          }}
          {...other}
      >
        <Stack spacing={-0.5}>
          <Box>
            <img width={40} height={40} src={Icon}/>
          </Box>
          <Box
              sx={{
                color: INSTRUMENT_COLOR[instruments[currIntrument]],
                fontWeight: 'bold'
              }}
          >
            {INSTRUMENT_NAME[instruments[currIntrument]]}
          </Box>
        </Stack>
      </Button>
  );
}