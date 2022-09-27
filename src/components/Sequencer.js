import {PlayArrow, Stop} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from "@mui/icons-material/Share";
import {Button, IconButton, Stack} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Tone from "tone";
import "../App.css";
import {usePattern} from "../hooks/usePattern";
import {
  INSTRUMENT_COLOR,
  NOTES
} from "../settings";
import {InstrumentSelector} from "./InstrumentSelector";
import {Note} from "./Note";
import {SpeedSelector} from "./SpeedSelector";
import SharePanelDialog from "./SharePanelDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {CustomButton} from "./CustomButton";

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

  // Popup agent
  const Popup = withReactContent(Swal);

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
    getPatternURL,
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

  const sharePatternWithDialog = (urlPromise) => {
    urlPromise.then(url => {
      if (url === "") {
        toast('Música vazia', {type: 'error'});
      } else {
        Popup.fire({
          title: 'Compartilhe a sua obra',
          html: `<input id="swal-input1" class="swal2-input" value=${url} disabled/>`,
          confirmButtonText: 'Copiar',
          confirmButtonColor: '#3085d6',
          showCancelButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(url).then(function () {
              Popup.fire(
                  'Copiado!',
                  'Só falta enviar para os seus amigos :)',
                  'success'
              )
            }, function (err) {
              console.error('Async: Could not copy text: ', err);
            });
          }
        });
      }
    })
  }

  return (
      <>
        <div className="sequencer-container">
          <div className="sequencer" ref={sequencerRef}>
            <table>
              <tbody>
              {pattern.map((row, x) => (
                  <tr>
                    {row.map((value, y) => (
                        <Note
                            key={`(${x},${y})`}
                            onClick={(e) => {
                              const inst = handlePatternChange({x, y, instrument});
                              if (inst) {
                                synth
                                    .getSynth(instrument)
                                    .triggerAttackRelease(NOTES[x], "8n");
                              }
                            }}
                            selected={value}
                            active={activeColumn == y}
                            color={INSTRUMENT_COLOR[value]}
                        />
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: 'absolute', top: '35%', right: 50 }}>
          <button className="circle-btn" onClick={() => incrementWidth()}>
            <span className="material-icons sequencer-width-opt">add_circle</span>
          </button>

          <button className="circle-btn" onClick={() => decrementWidth()}>
              <span className="material-icons sequencer-width-opt">
                remove_circle
              </span>
          </button>
        </div>

        {/* Desktop's version of the controls */}
        <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '100%',
              height: '20vh',
              alignItems: 'center',
              justifyContent: 'space-around',
              display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex'},
              position: 'absolute',
              top: '80vh',
              backgroundColor: '#282828',
              pl: '1.5em'
            }}
        >
          <button
              className="btn start-btn"
              style={{
                backgroundColor: playState == "started" ? "#f0264bCC" : "#11A4E2",
              }}
              onClick={() => toggle()}
          >
            {playState == "started" ? (
                <span className="material-icons">stop</span>
            ) : (
                <span className="material-icons">play_arrow</span>
            )}
          </button>

          <InstrumentSelector
              onChange={handleInstrumentChange}
              synth={synth}
          />

          <SpeedSelector
              speed={speed}
              handleSpeedChange={setSpeed}
          />

          <CustomButton
              onClick={cleanPattern}
              Icon={DeleteIcon}
              text='Clean'
          />

          <CustomButton
              onClick={() => sharePatternWithDialog(getPatternURL())}
              Icon={ShareIcon}
              text='Share'
          />

          <SharePanelDialog
              songURL={getPatternURL()}
          />
        </Stack>


        {/* Mobile's version of the controls */}
        <Stack
            direction={{xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row'}}
            spacing={2}
            sx={{
              width: '95%',
              alignItems: 'center',
              marginTop: '1.5em',
              display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none'}
            }}
        >
          <Stack direction="row">
            <button
                className="btn start-btn"
                style={{
                  backgroundColor: playState == "started" ? "#f0264bCC" : "#11A4E2",
                }}
                onClick={() => toggle()}
            >
              {playState == "started" ? (
                  <span className="material-icons">stop</span>
              ) : (
                  <span className="material-icons">play_arrow</span>
              )}
            </button>

            <CustomButton
                onClick={cleanPattern}
                Icon={DeleteIcon}
                text='Clean'
            />

            <CustomButton
                onClick={() => sharePatternWithDialog(getPatternURL())}
                Icon={ShareIcon}
                text='Share'
            />

            <SharePanelDialog
                songURL={getPatternURL()}
            />
          </Stack>

          <Stack
              direction="row"
              sx={{
                alignItems: 'space-around'
              }}
          >
            <InstrumentSelector
                onChange={handleInstrumentChange}
                synth={synth}
            />

            <SpeedSelector
                speed={speed}
                handleSpeedChange={setSpeed}
            />
          </Stack>
        </Stack>
      </>
  );
}

export default Sequencer;
