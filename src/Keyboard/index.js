import React from 'react';
import './styles.css';

export default ({
  activeNotes,
  addNote,
  removeNote,
  notes
}) => {
  return (
    <div className="Keyboard">
      {notes.map(note => {
        const className = [
          'Keyboard__tone',
          activeNotes.includes(note) ? 'Keyboard__tone--is-active' : '',
        ].join(' ');

        return (
          <div
            className={className}
            onClick={() => {
              if (activeNotes.includes(note)) {
                removeNote(note);
              } else {
                addNote(note);
              }
            }}
          >
            {note}
          </div>
        );
      })}
    </div>
  );
};
