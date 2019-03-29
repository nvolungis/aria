import React, {useEffect, useState, useRef} from 'react';
import Analyser from '../Analyser';
import useAnalyser from '../useAnalyser';
import useOscillators from '../useOscillators';
import useWindowSize from '../useWindowSize';
import Keyboard from '../Keyboard';

import { NOTES_WITH_FREQUENCIES } from '../constants';

export default () => {
  const [gain, setGain] = useState(.25);
  const [isActive, setIsActive] = useState(true);
  const [activeNotes, setActiveNotes] = useState([]);
  const context = useRef(new AudioContext());

  const analyserNode = useAnalyser(context.current);

  const oscillatorsNode = useOscillators(
    NOTES_WITH_FREQUENCIES,
    activeNotes,
    context.current,
  );

  const { width } = useWindowSize();

  useEffect(() => {
    oscillatorsNode.connect(analyserNode);
    analyserNode.connect(context.current.destination);
  }, []);

  return (
    <div>
      <Analyser node={analyserNode} height={200} width={width} />
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
