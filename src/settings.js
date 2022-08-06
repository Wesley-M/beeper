// All notes indexed (by row)
import axios from "axios";

export const NOTES = [
  "C#3",
  "D#3",
  "E#3",
  "F#3",
  "G#3",
  "A#3",
  "C#4",
  "D#4",
  "E#4",
  "F#4",
  "G#4",
  "A#4",
  "C#5",
  "D#5",
  "E#5",
  "F#5",
  "G#5",
  "A#5"
];

// Note Width
export const NOTE_WD = 2.4;

// Note Height
export const NOTE_HT = 1.2;

// Default width cells
export const WIDTH = Math.floor(
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / (NOTE_WD * 20 + 4)
);

// Default height in cells
export const HEIGHT = NOTES.length;

// Factor in which the width changes
export const WIDTH_INCREMENT_FACTOR = 10;

// Maximum width cells
export const MAX_WIDTH = 100;

// Default speed in which the active column changes
export const DEFAULT_SPEED = 10;

// Factors that change the speed
export const SPEED_FACTORS = [0.5, 1, 1.25, 1.5, 2];

export const INSTRUMENT_COLOR = {
  'synth': '#b517d1',
  'metal': '#eded2f',
  'membrane': '#20acf7',
  'fm': '#f57b17',
  'duo': '#c42222'
}

export const INSTRUMENT_NAME = {
  'synth': 'Melódico',
  'metal': 'Metálico',
  'membrane': 'Beep',
  'fm': 'Handpan',
  'duo': 'Distorcido'
}

const BACKEND_API = "https://beeper-record.herokuapp.com/api"
export const FRONTEND_API = "https://beeper.netlify.com"

export const api = axios.create({
  baseURL: BACKEND_API
});
