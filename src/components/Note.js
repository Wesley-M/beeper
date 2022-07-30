import { NOTE_WD } from '../settings';
/**
 * It represents each square, respective of a note
 */
export function Note({ onClick, selected, active, color }) {
  const noteStyle = {
    width: active ? `${NOTE_WD}em` : `${NOTE_WD}em`,
    height: active ? `${NOTE_WD}em` : `${NOTE_WD}em`,
    border: "0 solid",
    borderColor: active ? "#1a73e755" : selected ? color : "#1a73e733",
    borderWidth: active ? "3px" : "2px",
    borderRadius: "0.3em",
    backgroundColor: selected ? color : "transparent",
    opacity: active && selected ? 0.7 : 1,
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
