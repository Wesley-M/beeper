import Box from "@mui/material/Box";
import {useState} from "react";
import {INSTRUMENT_COLOR, INSTRUMENT_ICON, INSTRUMENT_NAME} from "../../settings";
import {Stack} from "@mui/material";
import {InstrumentButton, InstrumentName} from "./InstrumentSelector.styles";

export function InstrumentSelector({ onChange, synth, ...other }) {
  const instruments = Object.keys(INSTRUMENT_COLOR);

  const [currInstrument, setCurrInstrument] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleInstrument = () => {
    const next = instruments[(currInstrument + 1) % instruments.length];
    synth.getSynth(next).triggerAttackRelease("C#4", '8n');
    onChange(next);
    setCurrInstrument(old => (old + 1) % instruments.length);
    setImageLoaded(false);
  }

  const InstrumentIcon = INSTRUMENT_ICON[instruments[currInstrument]]
  const currInstrumentName = INSTRUMENT_NAME[instruments[currInstrument]];
  const currInstrumentColor = INSTRUMENT_COLOR[instruments[currInstrument]];

  return (
      <InstrumentButton
        variant="contained"
        backgroundColor={`${currInstrumentColor}11`}
        onClick={() => toggleInstrument()}
        disableElevation
      >
        <Stack spacing={-0.5}>
          <Box>
            <img
              width={40}
              height={40}
              onLoad={() => setImageLoaded(true)}
              src={InstrumentIcon}
              alt="Current instrument icon"
            />
          </Box>
          {imageLoaded ? (
            <InstrumentName color={currInstrumentColor}>
              {currInstrumentName}
            </InstrumentName>
          ) : null}
        </Stack>
      </InstrumentButton>
  );
}