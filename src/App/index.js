import React, {useEffect, useState, useRef} from 'react';
import ActivateModal from '../ActivateModal';
import Keyboard from '../Keyboard';
import useAnalyser from '../useAnalyser';
import useDistorion from '../useDistortion';
import useOscillators from '../useOscillators';
import useWindowSize from '../useWindowSize';
import Visualizer from '../Visualizer';

import { NOTES_WITH_FREQUENCIES } from '../constants';

import './styles.css';

export default () => {
  const [gain, setGain] = useState(.25);
  const [distortion, setDistortion] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [activeNotes, setActiveNotes] = useState([]);
  const context = useRef(new AudioContext());

  const analyserNode = useAnalyser(context.current);

  const distortionNode = useDistorion(context.current, distortion);

  const oscillatorsNode = useOscillators({
    activeNotes,
    context: context.current,
    isOn,
    notes: NOTES_WITH_FREQUENCIES,
  });

  const { width } = useWindowSize();

  useEffect(() => {
    oscillatorsNode.connect(distortionNode);
    distortionNode.connect(analyserNode);
    analyserNode.connect(context.current.destination);
  }, []);

  const className = [
    'App',
    isOn ? '' : 'App--is-inactive',
  ].join(' ');

  return (
    <div>
      {<ActivateModal isOn={isOn} setIsOn={setIsOn} />}
      <div className={className}>
        <Visualizer node={analyserNode} height={200} width={width} />
        <Keyboard
          activeNotes={activeNotes}
          notes={NOTES_WITH_FREQUENCIES.map(({tone}) => tone)}
          addNote={note => { setActiveNotes(activeNotes.concat(note)) }}
          removeNote={note => {
            setActiveNotes(activeNotes.filter(n => n !== note));
          }}
        />

        <h4>distortion</h4>
        <input
          type="range"
          min={0}
          max={100}
          value={distortion}
          onChange={e => setDistortion(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
