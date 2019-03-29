import { useCallback, useEffect, useRef } from 'react';

export default ({
  activeNotes,
  context,
  isOn,
  hasPlayed,
  onPlay,
  notes,
}) => {
  const getGainValue = tone => {
    return activeNotes.includes(tone) ? 1 : 0;
  };

  const accumulationNode = useRef(context.createGain());
  const nodes = useRef([]);

  useEffect(() => {
    nodes.current = notes.map(note => {
      const oscillatorNode = createNode({
        context,
        ...note,
      });

      return oscillatorNode;
    });
  }, []);

  useEffect(() => {
    nodes.current.forEach(([_, node]) => {
      node.connect(accumulationNode.current);
    });
  }, [nodes]);

  useEffect(() => {
    nodes.current.forEach(([_, node, tone]) => {
      node.gain.value = getGainValue(tone)
    });
  }, [activeNotes]);

  useEffect(() => {
    if (isOn) {
      nodes.current.forEach(([oNode]) => oNode.start(0));
    }
  }, [isOn]);

  return accumulationNode.current;
};

const createNode = ({context, tone, frequency}) => {
  const vco = context.createOscillator();
  const vca = context.createGain();

  vco.connect(vca)
  vco.frequency.value = frequency;
  vca.gain.value = 0;

  return [vco, vca, tone];
}
