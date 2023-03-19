import * as JsonURL from "json-url";
import { useEffect, useState } from "react";
import { DEFAULT_SPEED, FRONTEND_API, HEIGHT, MAX_WIDTH, WIDTH, WIDTH_INCREMENT_FACTOR } from "../settings";

// Initial sequence pattern
const initialPattern = Array.from({ length: HEIGHT }, (e) =>
    Array(WIDTH).fill(null)
);

/**
 * It manages the pattern and its changes
 */
export function usePattern() {
  // The current pattern
  const [pattern, setPattern] = useState(initialPattern);

  // The current width of the pattern board
  const [currWidth, setCurrWidth] = useState(WIDTH);

  // The initial speed defined by the user
  const [userDefaultSpeed, setUserDefaultSpeed] = useState(DEFAULT_SPEED);

  // The speed in which the pattern playing changes
  const [speed, setSpeed] = useState(userDefaultSpeed);

  // Compression algorithm
  const compression_agent = JsonURL("lzma");

  // A deep copy of the pattern
  const getPatternCopy = () => {
    return JSON.parse(JSON.stringify(pattern));
  };

  // It handles simple changes in pattern
  const handlePatternChange = ({ x, y, instrument }) => {
    const patternCopy = getPatternCopy();
    const sameInstrument = patternCopy[x][y] === instrument;
    patternCopy[x][y] = sameInstrument ? null : instrument;
    setPattern(patternCopy);
    return patternCopy[x][y];
  };

  // Cleans all active cells
  const cleanPattern = () => {
    setPattern(initialPattern);
    setCurrWidth(WIDTH);
    window.location.href = FRONTEND_API;
  };

  const getPatternURL = async () => {
    let music = {currWidth: currWidth, content: [], speed: speed};

    pattern.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell) {
          music.content.push([x, y, cell]);
        }
      });
    });

    const compressed_cells = await compression_agent.compress(music);
    const current_url =  window.location.href.split('?')[0];
    
    const final_url = `${current_url}?music=${compressed_cells}`;

    return music.content.length >= 1 ? final_url : '';
  };

  // It checks if there is a pattern in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const music = queryParams.get("music");

    if (music) {
      compression_agent.decompress(music).then((result) => {
        const {currWidth, content, speed} = result;
        const idealWidth = Math.max(currWidth, WIDTH);

        const patternCopy = getPatternCopy();
        updateWidth(idealWidth, patternCopy);
        
        for (let point of content) {
          patternCopy[point[0]][point[1]] = point[2];
        }
                
        setCurrWidth(idealWidth);
        setPattern(patternCopy);
        setSpeed(speed || DEFAULT_SPEED);
        setUserDefaultSpeed(speed || DEFAULT_SPEED);
      });
    }
  }, []);

  /**
   * Updates width of a pattern given a new current width
  */
  const updateWidth = (currWidth, patternCopy) => {
    const diff = currWidth - pattern[0].length;

    if (diff !== 0) {
        for (let row of patternCopy) {
          for (let i = 0; i < Math.abs(diff); i++) {
            if (diff > 0) {
              row.push(0);
            } else {
              row.pop();
            }
          }
        }
    }
  }

  /**
   * Reflecting change on current width
  */
  useEffect(() => {
    const patternCopy = getPatternCopy();
    updateWidth(currWidth, patternCopy);
    setPattern(patternCopy);
  }, [currWidth]);
  
  /**
   * It increments the size of the board
   */
  const incrementWidth = () => {
    setCurrWidth((oldWidth) =>
      Math.min(oldWidth + WIDTH_INCREMENT_FACTOR, MAX_WIDTH)
    );
  };

  /**
   * It decrements the size of the board
   */
  const decrementWidth = () => {
    setCurrWidth((oldWidth) =>
      Math.max(oldWidth - WIDTH_INCREMENT_FACTOR, WIDTH)
    );
  };

  return {
    pattern,
    setPattern,
    currWidth,
    userDefaultSpeed,
    speed,
    setSpeed,
    handlePatternChange,
    cleanPattern,
    getPatternURL,
    incrementWidth,
    decrementWidth,
  };
}
