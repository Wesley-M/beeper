import { useEffect, useState } from 'react';
import { MAX_WIDTH, WIDTH, WIDTH_INCREMENT_FACTOR } from '../settings';

/**
 * It manages the pattern and its changes
*/
export function usePattern(initialPattern) {
  // The current pattern
  const [ pattern, setPattern ] = useState(initialPattern);
  
  // The current width of the pattern board
  const [ currWidth, setCurrWidth ] = useState(WIDTH);

  
  // A deep copy of the pattern
  const getPatternCopy = () => {
    return JSON.parse(JSON.stringify(pattern));
  }

  // It handles simple changes in pattern
  const handlePatternChange = async ({ x, y, value }) => {
    const patternCopy = getPatternCopy();
    patternCopy[x][y] = +!value;
    await setPattern(patternCopy);
  }

  // Cleans all active cells
  const cleanPattern = () => {
    setPattern(initialPattern);
    setCurrWidth(WIDTH);
  }

  // It checks if there is a pattern in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const music = JSON.parse(queryParams.get("music"));
    
    if (music) {
      const patternCopy = getPatternCopy();
      for (let point of music) {
        patternCopy[point[0]][point[1]] = 1;
      }
      setPattern(patternCopy);
    }
  }, []);

  /** 
   * It increments the size of the board
  */
   const incrementWidth = () => {
    const patternCopy = getPatternCopy();

    if (currWidth + WIDTH_INCREMENT_FACTOR <= MAX_WIDTH) {
      for (let row of patternCopy) {
        for (let i = 0; i < WIDTH_INCREMENT_FACTOR; i++) {
          row.push(0);
        }
      }
    }

    setPattern(patternCopy);
    setCurrWidth(oldWidth => Math.min(oldWidth + WIDTH_INCREMENT_FACTOR, MAX_WIDTH));
  } 

  /** 
   * It decrements the size of the board
  */
  const decrementWidth = () => {
    const patternCopy = getPatternCopy();

    if (currWidth - WIDTH_INCREMENT_FACTOR >= WIDTH) {
      for (let row of patternCopy) {
        for (let i = 0; i < WIDTH_INCREMENT_FACTOR; i++) {
          row.pop();
        }
      }
    }

    setPattern(patternCopy);
    setCurrWidth(oldWidth => Math.max(oldWidth - WIDTH_INCREMENT_FACTOR, WIDTH));
  }

  return {
    pattern, 
    setPattern, 
    currWidth,
    handlePatternChange, 
    cleanPattern, 
    incrementWidth, 
    decrementWidth
  };
}
