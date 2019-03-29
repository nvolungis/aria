import React, {useCallback, useEffect, useRef} from 'react';

let reqID;

export default ({node, width, height}) => {
  const bufferLength = node.frequencyBinCount;
  const canvas = useRef(null);
  const dataArray = useRef(new Uint8Array(bufferLength));

  node.getByteTimeDomainData(dataArray.current);

  const draw = canvasContext => {
    node.getByteTimeDomainData(dataArray.current);
    canvasContext.fillStyle = "pink"
    canvasContext.fillRect(0, 0, width, height);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';

    canvasContext.beginPath();

    var sliceWidth = width * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      var v = dataArray.current[i] / 128.0;
      var y = v * height/2;

      if(i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(width, height/2);
    canvasContext.stroke();

    reqID = requestAnimationFrame(() => draw(canvasContext));
  };

  useEffect(() => {
    const canvasContext = canvas.current.getContext("2d");
    draw(canvasContext);
    return () => {cancelAnimationFrame(reqID) }
  }, [height, width]);

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
    />
  );
};
