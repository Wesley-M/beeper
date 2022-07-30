/**
 * It represents each square, respective of a note
*/
export function Note({ onClick, selected, active, color }) {
    const noteStyle = {
        width: active ? '3.2em' : '3em', 
        height: active ? '3.2em' : '3em',  
        border: '2px solid',
        borderColor: active ? '#44D62C' : selected ? color : '#b4b4b4', 
        borderWidth: active ? '3px' : '2px',
        borderRadius: '0.3em',
        backgroundColor: selected ? color : 'transparent',
        transition: 'background 100ms'
    }
  
    return (
        <button style={noteStyle} onClick={onClick}></button>
    )
  }