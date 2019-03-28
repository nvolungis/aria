import React, {useCallback, useState, useRef} from 'react';
import Oscillator from '../Oscillator';
import Keyboard from '../Keyboard';

import { NOTES_WITH_FREQUENCIES } from '../constants';

export default () => {
  const [gain, setGain] = useState(.25);
  const [isActive, setIsActive] = useState(true);
  const [activeNotes, setActiveNotes] = useState([]);
  const context = useRef(new AudioContext());
  const getGainValue = useCallback(tone => {
    return activeNotes.includes(tone) ? gain : 0;
  }, [activeNotes, gain]);

  return (
    <div>
      {isActive && (
        <div>
          {NOTES_WITH_FREQUENCIES.map(
            ({tone, frequency}) => (
              <Oscillator
                context={context.current}
                frequency={frequency}
                gain={getGainValue(tone)}
                key={tone}
                tone={tone}
              />
            )
          )}
        </div>
      )}

      <Keyboard
        activeNotes={activeNotes}
        notes={NOTES_WITH_FREQUENCIES.map(({tone}) => tone)}
        addNote={note => { setActiveNotes(activeNotes.concat(note)) }}
        removeNote={note => {
          setActiveNotes(activeNotes.filter(n => n !== note));
        }}
      />

      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "stop" : "start"}
      </button>
    </div>
  );
}
