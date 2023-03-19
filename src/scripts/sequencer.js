import {NOTES} from "../settings";

/**
 * Returns an object mapping from instrument to musical note(s).
 * Its scope is limited to a column (e.g. The active column).
 *
 * @param {Array<Array<String>>} pattern The song pattern board
 * @param {Number} col The column to be inspected
 * */
const getMultiInstrumentsChord = (pattern, col) => {
  const chords = {};
  pattern.forEach((row, noteIdx) => {
    const instrument = row[col];
    if (instrument) {
      chords[instrument] = chords[instrument] || [];
      chords[instrument].push(NOTES[noteIdx]);
    }
  });
  return chords;
}

/**
 * Given a pattern, column, synthesizer and time. It plays all chords,
 * by instrument.
 *
 * @param {Array<Array<String>>} pattern The song pattern board
 * @param {Number} col The column to be inspected
 * @param {Synth} synth A synthesizer wrapper
 * @param {Number} duration Note/Chord duration
 * */
export const playChord = (pattern, col, synth, duration) => {
  const chord = getMultiInstrumentsChord(pattern, col);
  for (let instrument in chord) {
    synth.getSynth(instrument).triggerAttackRelease(chord[instrument], "8n", duration);
  }
}