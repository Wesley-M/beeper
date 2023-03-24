import {NOTE_HT, NOTE_WD} from '../../settings';

/**
 * It represents each square, respective of a note
 */
export function Note({ onClick, selected, active, color }) {
  const noteBackground = (active, selected) => {
    if (active) {
      if (selected) {
        return 'white';
      } else {
        return '#28282880'
      }
    } else if (selected) {
      return color;
    } else {
      return '#282828';
    }
  }

  const noteStyle = {
    minWidth: `${NOTE_WD}em`,
    height: `${NOTE_HT}vh`,
    border: "1px solid white",
    borderRadius: "0.25em",
    borderColor: active ? "white" : selected ? color : "#FFFFFF10",
    borderWidth: active ? "3px" : "1px",
    backgroundColor: noteBackground(active, selected),
    opacity: active && selected ? 0.9 : 1,
    transition: "background 100ms"
  };

  return (
    <td
      onMouseOver={(e) => {
        if (e.buttons == 1 || e.buttons == 3) {
          onClick();
        }
      }}
      onMouseDown={onClick}
    >
      <span style={{ width: "100%", height: "100%", display: "table", ...noteStyle }}></span>
    </td>
  );
}
