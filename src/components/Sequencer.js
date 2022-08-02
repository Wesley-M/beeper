import { PlayArrow, Stop } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from "@mui/icons-material/Share";
import { Button, IconButton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import "../App.css";
import { usePattern } from "../hooks/usePattern";
import {
  INSTRUMENT_COLOR,
  NOTES
} from "../settings";
import { InstrumentSelector } from "./InstrumentSelector";
import { Note } from "./Note";
import { SpeedSelector } from "./SpeedSelector";

/**
 * A synthesizer wrapper
 */
class Synth {
  constructor() {
    this.membrane = new Tone.PolySynth(Tone.MembraneSynth).toDestination();
    this.metal = new Tone.PolySynth(Tone.MetalSynth).toDestination();
    this.synth = new Tone.PolySynth().toDestination();
    this.fm = new Tone.PolySynth(Tone.FMSynth).toDestination();
    this.duo = new Tone.PolySynth(Tone.DuoSynth).toDestination();
  }

  getSynth(synth_str) {
    switch (synth_str) {
      case "membrane":
        return this.membrane;
      case "metal":
        return this.metal;
      case "fm":
        return this.fm;
      case "duo":
        return this.duo;
      default:
        return this.synth;
    }
  }
}

// A synthesizer object
const synth = new Synth();

/**
 * The sequence board
 */
function Sequencer() {
  // The playback state (stopped, started or paused)
  const [playState, setPlayState] = useState(Tone.Transport.state);

  // The active column at the moment
  const [activeColumn, setColumn] = useState(0);

  // Selected instrument at the moment
  const [instrument, setInstrument] = useState('synth');

  const handleInstrumentChange = (inst) => {
    setInstrument(inst);
  };

  const {
    pattern,
    setPattern,
    currWidth,
    speed,
    setSpeed,
    handlePatternChange,
    cleanPattern,
    sharePattern,
    incrementWidth,
    decrementWidth,
  } = usePattern();

  // Reference to the div that contains the table
  const sequencerRef = useRef(null);

  // Runs the sequencer
  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // Update active column for animation
          setColumn(col);

          // Mapping instrument to chord
          let instrument_chord = {};

          // Loop current pattern
          pattern.map((row, noteIndex) => {
            // If active
            if (row[col]) {
              if (!instrument_chord[row[col]]) {
                instrument_chord[row[col]] = [];
              }
              instrument_chord[row[col]].push(NOTES[noteIndex]);
            }
          });

          for (let instrument in instrument_chord) {
            synth.getSynth(instrument).triggerAttackRelease(instrument_chord[instrument], "8n", time);
          }

          sequencerRef.current.scrollLeft = col * 32;
        },
        Array.from(Array(currWidth).keys()),
        Math.floor(speed) + "n"
      ).start(0);

      return () => loop.dispose();
    },
    [pattern, speed, currWidth] // Retrigger when pattern changes
  );

  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  return (
      <div className="body">
        <div className="sequencer-container">
          <div className="sequencer" ref={sequencerRef}>
            <table>
              <tbody>
                {pattern.map((row, x) => (
                  <tr>
                    {row.map((value, y) => (
                      <td>
                        <Note
                          key={x}
                          onClick={() => {
                            handlePatternChange({ x, y, instrument });
                            synth
                              .getSynth(instrument)
                              .triggerAttackRelease(NOTES[x], "8n");
                          }}
                          selected={value}
                          active={activeColumn == y}
                          color={INSTRUMENT_COLOR[value]}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button className="circle-btn" onClick={() => incrementWidth()}>
              <span class="material-icons sequencer-width-opt">add_circle</span>
            </button>

            <button className="circle-btn" onClick={() => decrementWidth()}>
              <span class="material-icons sequencer-width-opt">
                remove_circle
              </span>
            </button>
          </div>
        </div>

        {/* Desktop's version of the controls */}
        <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '95%',
              alignItems: 'center',
              marginTop: '1.5em',
              display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex'}
            }}
        >
          <button
              className="btn start-btn"
              style={{
                backgroundColor: playState == "started" ? "#f0264bCC" : "#1a73e7cc",
              }}
              onClick={() => toggle()}
          >
            {playState == "started" ? (
                <span class="material-icons">stop</span>
            ) : (
                <span class="material-icons">play_arrow</span>
            )}
          </button>

          <SpeedSelector
              speed={speed}
              handleSpeedChange={setSpeed}
          />

          <InstrumentSelector
              onChange={handleInstrumentChange}
              synth={synth}
          />

          <Button
              variant="contained"
              onClick={() => cleanPattern()}
              color="error"
              size="large"
              startIcon={<DeleteIcon />}
              disableElevation
          >
            Limpar
          </Button>

          <Button
              variant="contained"
              onClick={() => sharePattern()}
              startIcon={<ShareIcon />}
              size="large"
              disableElevation
          >
            Compartilhar
          </Button>
        </Stack>

        {/* Mobile's version of the controls */}
        <Stack
            direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row'}}
            spacing={2}
            sx={{
              width: '95%',
              alignItems: 'center',
              marginTop: '1.5em',
              display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none'}
            }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <SpeedSelector
                speed={speed}
                handleSpeedChange={setSpeed}
            />

            <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: playState == "started" ? "#f0264bCC" : "#1a73e7cc",
                }}
                onClick={() => toggle()}
                size="large"
            >
              {playState == "started" ? (
                  <Stop/>
              ) : (
                  <PlayArrow/>
              )}
            </IconButton>
          </Stack>

          <InstrumentSelector
              onChange={handleInstrumentChange}
              synth={synth}
              fullWidth
          />

          <Button
              variant="contained"
              onClick={() => sharePattern()}
              startIcon={<ShareIcon />}
              size="large"
              disableElevation
              fullWidth
          >
            Compartilhar
          </Button>

          <Button
              variant="contained"
              onClick={() => cleanPattern()}
              color="error"
              size="large"
              startIcon={<DeleteIcon />}
              disableElevation
              fullWidth
          >
            Limpar
          </Button>
        </Stack>
      </div>
  );
}

export default Sequencer;
