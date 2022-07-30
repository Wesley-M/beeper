import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import "../App.css";
import {
  DEFAULT_VEL,
  HEIGHT,
  NOTES,
  NOTES_METADATA,
  VEL_FACTORS,
  WIDTH
} from "../settings";
import { Note } from "./Note";
import { usePattern } from "./usePattern";

/**
 * A synthesizer wrapper
 */
class Synth {
  constructor() {
    this.membrane = new Tone.PolySynth(Tone.MembraneSynth).toDestination();
    this.metal = new Tone.PolySynth(Tone.MetalSynth).toDestination();
    this.synth = new Tone.PolySynth().toDestination();
  }

  getSynth(synth_str) {
    switch (synth_str) {
      case "membrane":
        return this.membrane;
      case "metal":
        return this.metal;
      default:
        return this.synth;
    }
  }
}

// A synthesizer object
const synth = new Synth();

// Initial sequence pattern
const initialPattern = Array.from({ length: HEIGHT }, (e) =>
  Array(WIDTH).fill(0)
);

/**
 * The sequence board
 */
function Sequencer() {
  // The playback state (stopped, started or paused)
  const [playState, setPlayState] = useState(Tone.Transport.state);

  // The active column at the moment
  const [activeColumn, setColumn] = useState(0);

  // The velocity in which the active column changes
  const [velocity, setVelocity] = useState(DEFAULT_VEL);

  const {
    pattern,
    setPattern,
    currWidth,
    handlePatternChange,
    cleanPattern,
    incrementWidth,
    decrementWidth,
  } = usePattern(initialPattern);

  // Reference to the div that contains the table
  const sequencerRef = useRef(null);

  // Changes the velocity based on a factor
  const toggleVelocity = (factor = 1) => {
    setVelocity(DEFAULT_VEL * factor);
  };

  // Checks if velocity is selected
  const isVelSelected = (vel) => {
    return DEFAULT_VEL * vel == velocity;
  };

  // Runs the sequencer
  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // Update active column for animation
          setColumn(col);

          let synth_chord = [];
          let membrane_chord = [];
          let metal_chord = [];

          // Loop current pattern
          pattern.map((row, noteIndex) => {
            // If active
            if (row[col]) {
              let currSynth = NOTES_METADATA[NOTES[noteIndex]]["synth"];

              switch (currSynth) {
                case "synth":
                  synth_chord.push(NOTES[noteIndex]);
                  break;
                case "membrane":
                  membrane_chord.push(NOTES[noteIndex]);
                  break;
                case "metal":
                  metal_chord.push(NOTES[noteIndex]);
                  break;
              }
            }
          });

          synth.getSynth("synth").triggerAttackRelease(synth_chord, "8n", time);
          synth
            .getSynth("membrane")
            .triggerAttackRelease(membrane_chord, "8n", time);
          synth
            .getSynth("metal")
            .triggerAttackRelease(metal_chord, "16n", time);

          sequencerRef.current.scrollLeft =
            col * WIDTH * Math.log((velocity + 11) / 2);
        },
        Array.from(Array(currWidth).keys()),
        Math.floor(velocity) + "n"
      ).start(0);

      return () => loop.dispose();
    },
    [pattern, velocity, currWidth] // Retrigger when pattern changes
  );

  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  return (
    <div className="App">
      <div className="sequencer-options">
        <button
          className="btn start-btn"
          style={{
            backgroundColor: playState == "started" ? "#f0264bCC" : "#31a03cCC",
          }}
          onClick={() => toggle()}
        >
          {playState == "started" ? (
            <span class="material-icons">stop</span>
          ) : (
            <span class="material-icons">play_arrow</span>
          )}
          {playState == "started" ? "Parar" : "Começar"}
        </button>

        <div className="vel-container">
          <p className="vel-label">Velocidade</p>
          <div className="vel-btn-container">
            {VEL_FACTORS.map((factor) => (
              <button
                className="vel-btn"
                style={{
                  backgroundColor: isVelSelected(factor) ? "#b35508" : "white",
                  color: isVelSelected(factor) ? "white" : "#b35508",
                }}
                onClick={() => toggleVelocity(factor)}
              >
                x{factor}
              </button>
            ))}
          </div>
        </div>

        <button class="btn clear-btn" onClick={() => cleanPattern()}>
          <span class="material-icons">delete</span>
          <span>Limpar</span>
        </button>
      </div>

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
                        onClick={() => handlePatternChange({ x, y, value })}
                        selected={value}
                        active={activeColumn == y}
                        color={NOTES_METADATA[NOTES[x]]["color"]}
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
    </div>
  );
}

export default Sequencer;
