import axios from "axios";

import Melodic from './images/melodic.svg'
import Beep from './images/beep.svg'
import Distorted from './images/distorted.svg'
import Handpan from './images/handpan.svg'
import Metalic from './images/metalic.svg'

// All notes indexed (by row)
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

// Client width
const CLIENT_WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

// Default height cells
export const HEIGHT = NOTES.length;

// Note Height
export const NOTE_HT = (100 / HEIGHT) * 0.70;

// Note Width
export const NOTE_WD = 2;

// Default width cells
export const WIDTH = Math.floor(
    CLIENT_WIDTH / (NOTE_WD * 20)
);

// Factor in which the width changes
export const WIDTH_INCREMENT_FACTOR = 10;

// Maximum width cells
export const MAX_WIDTH = 100;

// Default speed in which the active column changes
export const DEFAULT_SPEED = 10;

// Default mapping of instruments to colors
export const INSTRUMENT_COLOR = {
  'synth': '#B872FC',
  'metal': '#C59826',
  'membrane': '#20ACF7',
  'fm': '#F57B17',
  'duo': '#C42222'
}

export const INSTRUMENT_NAME = {
  'synth': 'Melodic',
  'metal': 'Metalic',
  'membrane': 'Beep',
  'fm': 'Handpan',
  'duo': 'Distorted'
}

export const INSTRUMENT_ICON = {
  'synth': Melodic,
  'metal': Metalic,
  'membrane': Beep,
  'fm': Handpan,
  'duo': Distorted
}

// The backend api url
const BACKEND_API = "https://beeper-record.cyclic.app/api"

// The frontend api url
export const FRONTEND_API = "https://beeper.netlify.com"

// The backend api instance
export const api = axios.create({
  baseURL: BACKEND_API
});
