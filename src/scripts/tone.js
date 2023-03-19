/**
 * Converts from a number to a valid ToneJS duration
 * */
export const toToneDuration = (speed) => {
  return Math.floor(speed) + "n";
}