// Default width cells
export const WIDTH = 16;

// Factor in which the width changes
export const WIDTH_INCREMENT_FACTOR = 10;

// Maximum width cells
export const MAX_WIDTH = 5 * WIDTH;

// Default height in cells
export const HEIGHT = 10;

// Default velocity in which the active column changes
export const DEFAULT_VEL = 10;

// Default velocity in which the active column changes
export const VEL_FACTORS = [0.5, 1, 1.25, 1.5, 2];

// All notes indexed (by row)
export const NOTES = [
  "C#4",
  "D#4",
  "F#4",
  "G#4",
  "A#4",
  "C#5",
  "D#5",
  "F#5",
  "C0",
  "32n",
];

// All notes metadata (by row)
export const NOTES_METADATA = {
  "C#4": {
    synth: "synth",
    color: "#df43fa",
  },
  "D#4": {
    synth: "synth",
    color: "#d61bf7",
  },
  "F#4": {
    synth: "membrane",
    color: "#83d2fc",
  },
  "G#4": {
    synth: "membrane",
    color: "#72ccfc",
  },
  "A#4": {
    synth: "membrane",
    color: "#52bdf7",
  },
  "C#5": {
    synth: "membrane",
    color: "#33b1f5",
  },
  "D#5": {
    synth: "membrane",
    color: "#20acf7",
  },
  "F#5": {
    synth: "membrane",
    color: "#02a2f7",
  },
  C0: {
    synth: "membrane",
    color: "#000000",
  },
  "32n": {
    synth: "metal",
    color: "#eded2f",
  },
};
