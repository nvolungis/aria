import { useEffect, useRef } from 'react';

export default ({context, frequency, gain}) => {
  const vco = useRef(context.createOscillator());
  const vca = useRef(context.createGain());

  useEffect(() => {
    vco.current.connect(vca.current)
    vco.current.start(0);
    vca.current.connect(context.destination);
    return () => vco.current.stop(0);
  }, []);

  useEffect(() => {
    vco.current.frequency.value = frequency;
    vca.current.gain.value = gain;
  }, [frequency, gain]);

  return null;
}
