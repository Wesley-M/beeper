import {NOTE_HT, NOTE_WD} from '../settings';

/**
 * It represents each square, respective of a note
 */
export function Note({ onClick, selected, active, color }) {
  const noteStyle = {
    minWidth: `${NOTE_WD}em`,
    height: `${NOTE_HT}vh`,
    border: "0 solid",
    borderColor: active ? "rgba(255,255,255,0.7)" : selected ? color : "#28282855",
    borderWidth: active ? "3px" : "1px",
    backgroundColor: selected ? color : "#545454",
    opacity: active && selected ? 0.9 : 1,
    transition: "background 100ms"
  };

  return (
    <td
      style={noteStyle}
      onMouseOver={(e) => {
        if (e.buttons == 1 || e.buttons == 3) {
          onClick();
        }
      }}
      onMouseDown={onClick}
    ></td>
  );
}
