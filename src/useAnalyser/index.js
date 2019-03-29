import { useEffect, useRef } from 'react';

export default (context) => {
  const analyserNode = useRef(context.createAnalyser());

  useEffect(() => {
    analyserNode.current.fftSize = 2048;
  }, []);

  return analyserNode.current;
};
