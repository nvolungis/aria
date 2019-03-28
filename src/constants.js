export const BASE_FREQUENCIES = [
  27.5000, // A
  29.1353, // A#/Bb
  30.8677, // B
  32.7032, // C
  34.6479, // C#/Db
  36.7081, // D
  38.8909, // D#/Eb
  41.2035, // E
  43.6536, // F
  46.2493, // F#/Gb
  48.9995, // G
  51.9130, // G#/Ab
];

export const NOTE_FREQUENCY_INDEX = {
  'A'  : 0,
  'A#' : 1,
  'Bb' : 1,
  'B'  : 2,
  'C'  : 3,
  'C#' : 4,
  'Db' : 4,
  'D'  : 5,
  'D#' : 6,
  'Eb' : 6,
  'E'  : 7,
  'F'  : 8,
  'F#' : 9,
  'G'  : 10,
  'G#' : 11,
  'Ab' : 11,
};

export const OCTAVES = [ 3, 4, 5, 6 ];

const getFrequency = tone => {
  const [note, octaveIndex] = tone.match(/[0-9]+|[^0-9]+/gi);
  const baseFrequency = BASE_FREQUENCIES[NOTE_FREQUENCY_INDEX[note]];
  return  baseFrequency * (2 ** parseInt(octaveIndex) );
};

export const NOTES_WITH_FREQUENCIES = OCTAVES.reduce((memo, octaveIndex) => {
  const octaveToneFrequencyMap = Object.entries(NOTE_FREQUENCY_INDEX)
    .reduce((memo, [note, frequencyIndex]) => {
      const tone = `${note}${octaveIndex}`;
      const toneFrequencyMap = {tone, frequency: getFrequency(tone)}
      return memo.concat(toneFrequencyMap);
    }, []);

  return memo.concat(octaveToneFrequencyMap);
}, []);
