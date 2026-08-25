/**
 * Thin wrappers around the Web Audio API used for the live recording view
 * (volume meter, waveform). Actual DSP/analysis happens server-side in
 * app/api/analyze — this file only covers what needs to run in-browser
 * for real-time UI feedback while recording.
 */

export function createAudioAnalyser(stream: MediaStream): {
  analyser: AnalyserNode;
  audioContext: AudioContext;
} {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);
  return { analyser, audioContext };
}

/** Instantaneous volume (0-1) for a simple live level meter. */
export function getVolumeLevel(analyser: AnalyserNode): number {
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(data);
  let sumSquares = 0;
  for (const value of data) {
    const normalized = value / 128 - 1;
    sumSquares += normalized * normalized;
  }
  return Math.sqrt(sumSquares / data.length);
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
