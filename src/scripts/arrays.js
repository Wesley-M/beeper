/**
 * Generates a sequence of numbers. In case min is larger than
 * max, then empty the array is returned.
 *
 * @param {number} min Lower bound of the sequence
 * @param {number} max High bound of the sequence
 */
export const seq = (min = 0, max = 0) => {
  let arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}