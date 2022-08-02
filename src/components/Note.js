import {NOTE_HT, NOTE_WD} from '../settings';

/**
 * It represents each square, respective of a note
 */
export function Note({ onClick, selected, active, color }) {
  const noteStyle = {
    width: active ? `${NOTE_WD}em` : `${NOTE_WD}em`,
    height: active ? `${NOTE_HT}em` : `${NOTE_HT}em`,
    border: "0 solid",
    borderColor: active ? "rgba(255,255,255,0.7)" : selected ? color : "#00000011",
    borderWidth: active ? "3px" : "2px",
    borderRadius: "0.2em",
    backgroundColor: selected ? color : "rgba(180,180,180,0.4)",
    opacity: active && selected ? 0.9 : 1,
    transition: "background 100ms"
  };

  return (
    <button
      style={noteStyle}
      onMouseOver={(e) => {
        if (e.buttons == 1 || e.buttons == 3) {
          onClick();
        }
      }}
      onMouseDown={onClick}
    ></button>
  );
}
