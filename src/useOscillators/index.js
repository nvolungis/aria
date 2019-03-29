import { useCallback, useEffect, useRef } from 'react';

export default (notes, activeNotes, context) => {
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
    nodes.current.forEach(([node]) => {
      node.connect(accumulationNode.current);
    });
  }, [nodes]);

  useEffect(() => {
    nodes.current.forEach(([node, tone]) => {
      node.gain.value = getGainValue(tone)
    });
  }, [activeNotes]);

  return accumulationNode.current;
};

const createNode = ({context, tone, frequency}) => {
  const vco = context.createOscillator();
  const vca = context.createGain();

  vco.connect(vca)
  vco.start(0);
  vco.frequency.value = frequency;
  vca.gain.value = 0;

  return [vca, tone];
}
