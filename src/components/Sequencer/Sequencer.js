import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from "@mui/icons-material/Share";
import {Box, Stack} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Tone from "tone";
import "../../App.css";
import {useSongPattern} from "../../hooks/useSongPattern";
import {
  INSTRUMENT_COLOR,
  NOTES
} from "../../settings";
import {Note} from "../Note";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {playChord} from "../../scripts/sequencer";
import {seq} from "../../scripts/arrays";
import {Synth} from "../../scripts/synth";
import {toToneDuration} from "../../scripts/tone";
import {setContainerScrollPos} from "../../scripts/scroll";
import {Controls} from "./Controls";
import CustomScroll from 'react-custom-scroll';

// A synthesizer object
const synth = new Synth();

/**
 * The sequence board
 */
function Sequencer() {
  // The playback state (stopped, started or paused)
  const [playState, setPlayState] = useState(Tone.Transport.state);

  // The active column at the moment
  const [activeColumn, setActiveColumn] = useState(0);

  // Selected instrument at the moment
  const [instrument, setInstrument] = useState('synth');

  // Popup agent
  const Popup = withReactContent(Swal);

  const {
    pattern,
    patternWidth,
    speed,
    handlePatternChange,
    ...patternParams
  } = useSongPattern();

  /**
   * References the tag that contains the sequencer table
   * */
  const sequencerContainerRef = useRef(null);

  /**
   * Handles the change on instrument
   * */
  const handleInstrumentChange = (inst) => {
    setInstrument(inst);
  };

  /**
   * Handles a note click in the sequencer
   * */
  const handleNoteClick = (x, y, instrument) => {
    const toPlay = handlePatternChange({x, y, instrument});
    if (toPlay) {
      synth.getSynth(instrument).triggerAttackRelease(NOTES[x], "8n");
    }
  }

  /**
   * A sequence from 0 to pattern width
   * */
  const noteSequence = seq(0, patternWidth);

  /**
   * Duration padding between notes
   * */
  const notePadding = toToneDuration(speed);

  /**
   * Main note playing function
   * */
  const playNote = (time, colIdx) => {
    setActiveColumn(colIdx);
    playChord(pattern, colIdx, synth, time);
    setContainerScrollPos(sequencerContainerRef, colIdx * 32);
  }

  /**
   * The main sequencer loop
   * */
  useEffect(
    () => {
      const loop = new Tone.Sequence(playNote, noteSequence, notePadding).start(0);
      return () => loop.dispose();
    },
    [pattern, speed, patternWidth]
  );

  /**
   * Toggles the status of the sequencer (started, paused)
   * */
  const toggleSequencerStatus = useCallback(() => {
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
      <Box className="sequencer-container">
        <Box className="sequencer" ref={sequencerContainerRef}>
            <table>
              <tbody>
                {pattern.map((row, x) => (
                  <tr>
                    {row.map((value, y) => (
                      <Note
                        key={`(${x},${y})`}
                        onClick={() => handleNoteClick(x, y, instrument)}
                        selected={value}
                        active={activeColumn === y}
                        color={INSTRUMENT_COLOR[value]}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </Box>
      </Box>

      <Controls
        synth={synth}
        playState={playState}
        handleInstrumentChange={handleInstrumentChange}
        sharePatternWithDialog={sharePatternWithDialog}
        toggleSequencerStatus={toggleSequencerStatus}
        {...patternParams}
      />
    </>
  );
}

export default Sequencer;
