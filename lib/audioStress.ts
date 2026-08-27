export interface SyllableMeasurement {
  index: number;
  /** Peak loudness in this syllable's segment, relative to the loudest syllable (0-1). */
  relativeLoudness: number;
  /** Pitch in this segment relative to the word's average pitch (0-1, 0.5 = average). */
  relativePitch: number;
  /** Combined loudness+pitch score used to pick the measured stress (0-1). */
  score: number;
}

export interface StressMeasurement {
  measuredStressIndex: number;
  syllables: SyllableMeasurement[];
}

const FRAME_SECONDS = 0.02; // 20ms analysis frames
const PITCH_WINDOW_SECONDS = 0.04; // 40ms window for autocorrelation
const MIN_VOICE_HZ = 60;
const MAX_VOICE_HZ = 500;

/**
 * Estimates which syllable of a word recording was stressed, by measuring
 * loudness and pitch per syllable. This is an approximation, not forced
 * alignment: syllable boundaries are estimated by trimming silence and then
 * dividing the remaining voiced audio into `syllableCount` equal-time
 * segments. Good enough to flag "you're stressing the wrong syllable" for
 * practice — not a phonetics lab measurement. Runs entirely client-side via
 * the Web Audio API, so it costs nothing and needs no network round trip.
 */
export async function measureSyllableStress(
  blob: Blob,
  syllableCount: number,
): Promise<StressMeasurement> {
  if (syllableCount < 1) {
    return { measuredStressIndex: 0, syllables: [] };
  }

  const AudioContextCtor =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioContextCtor();

  try {
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const channel = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;

    const frameSize = Math.max(1, Math.round(sampleRate * FRAME_SECONDS));
    const frameCount = Math.floor(channel.length / frameSize);
    const frameRms: number[] = new Array(frameCount);
    for (let f = 0; f < frameCount; f++) {
      let sum = 0;
      const start = f * frameSize;
      for (let i = 0; i < frameSize; i++) {
        const s = channel[start + i];
        sum += s * s;
      }
      frameRms[f] = Math.sqrt(sum / frameSize);
    }

    if (frameCount === 0) {
      return {
        measuredStressIndex: 0,
        syllables: Array.from({ length: syllableCount }, (_, index) => ({
          index,
          relativeLoudness: 0,
          relativePitch: 0.5,
          score: 0,
        })),
      };
    }

    // Trim leading/trailing silence so segment boundaries land on speech.
    const peakRms = Math.max(...frameRms, 1e-6);
    const silenceThreshold = peakRms * 0.08;
    let startFrame = frameRms.findIndex((v) => v > silenceThreshold);
    let endFrame =
      frameRms.length - 1 - [...frameRms].reverse().findIndex((v) => v > silenceThreshold);
    if (startFrame === -1) startFrame = 0;
    if (endFrame <= startFrame) endFrame = frameRms.length - 1;

    // Rather than blindly dividing the voiced span into N equal-time
    // segments (which can misattribute a loud syllable's tail to its
    // quieter neighbor when syllables aren't equal length), snap each
    // internal boundary to the quietest nearby frame — the actual gap
    // between syllables.
    const voicedFrameCount = endFrame - startFrame + 1;
    const framesPerSyllable = voicedFrameCount / syllableCount;
    const boundaries: number[] = [startFrame];
    for (let s = 1; s < syllableCount; s++) {
      const approx = startFrame + Math.round(s * framesPerSyllable);
      const searchRadius = Math.max(1, Math.floor(framesPerSyllable / 2));
      let bestFrame = approx;
      let bestValue = Infinity;
      for (
        let f = Math.max(startFrame, approx - searchRadius);
        f <= Math.min(endFrame, approx + searchRadius);
        f++
      ) {
        if (frameRms[f] < bestValue) {
          bestValue = frameRms[f];
          bestFrame = f;
        }
      }
      boundaries.push(bestFrame);
    }
    boundaries.push(endFrame + 1);

    const pitchWindowSize = Math.max(1, Math.round(sampleRate * PITCH_WINDOW_SECONDS));
    const loudnessRaw: number[] = [];
    const pitchRaw: number[] = [];

    for (let s = 0; s < syllableCount; s++) {
      const segStart = boundaries[s];
      const segEnd = boundaries[s + 1];

      let peak = 0;
      for (let f = segStart; f < segEnd && f < frameRms.length; f++) {
        if (frameRms[f] > peak) peak = frameRms[f];
      }
      loudnessRaw.push(peak);

      const centerSample = Math.floor(((segStart + segEnd) / 2) * frameSize);
      const windowStart = Math.max(0, Math.min(channel.length - pitchWindowSize, centerSample - pitchWindowSize / 2));
      const window = channel.subarray(windowStart, windowStart + pitchWindowSize);
      pitchRaw.push(autoCorrelate(window, sampleRate));
    }

    const maxLoudness = Math.max(...loudnessRaw, 1e-6);
    const validPitches = pitchRaw.filter((p) => p > 0);
    const avgPitch = validPitches.length
      ? validPitches.reduce((a, b) => a + b, 0) / validPitches.length
      : 0;
    const maxPitchDeviation = Math.max(...pitchRaw.map((p) => Math.abs(p - avgPitch)), 1e-6);

    const syllables: SyllableMeasurement[] = [];
    let measuredStressIndex = 0;
    let bestScore = -1;

    for (let s = 0; s < syllableCount; s++) {
      const relativeLoudness = loudnessRaw[s] / maxLoudness;
      const relativePitch =
        pitchRaw[s] > 0 ? 0.5 + (pitchRaw[s] - avgPitch) / (2 * maxPitchDeviation) : 0.5;
      const score = relativeLoudness * 0.65 + Math.min(1, Math.max(0, relativePitch)) * 0.35;

      syllables.push({ index: s, relativeLoudness, relativePitch, score });
      if (score > bestScore) {
        bestScore = score;
        measuredStressIndex = s;
      }
    }

    return { measuredStressIndex, syllables };
  } finally {
    audioCtx.close();
  }
}

/**
 * Autocorrelation-based fundamental frequency (pitch) estimate for one
 * frame of audio. Standard technique for monophonic pitch detection —
 * returns -1 when the frame is too quiet or the estimate falls outside the
 * typical human voice range to be trusted.
 */
function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  const size = buf.length;
  let rms = 0;
  for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / size);
  if (rms < 0.01) return -1;

  let r1 = 0;
  let r2 = size - 1;
  const threshold = 0.2;
  for (let i = 0; i < size / 2; i++) {
    if (Math.abs(buf[i]) < threshold) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < size / 2; i++) {
    if (Math.abs(buf[size - i]) < threshold) {
      r2 = size - i;
      break;
    }
  }

  const trimmed = buf.slice(r1, r2);
  const newSize = trimmed.length;
  if (newSize < 8) return -1;

  const c = new Float32Array(newSize);
  for (let i = 0; i < newSize; i++) {
    for (let j = 0; j < newSize - i; j++) {
      c[i] += trimmed[j] * trimmed[j + i];
    }
  }

  let d = 0;
  while (d < newSize - 1 && c[d] > c[d + 1]) d++;

  let maxVal = -1;
  let maxPos = -1;
  for (let i = d; i < newSize; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i];
      maxPos = i;
    }
  }
  if (maxPos <= 0) return -1;

  let t0 = maxPos;
  const x1 = c[t0 - 1] ?? c[t0];
  const x2 = c[t0];
  const x3 = c[t0 + 1] ?? c[t0];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a !== 0) t0 = t0 - b / (2 * a);

  const freq = sampleRate / t0;
  if (freq < MIN_VOICE_HZ || freq > MAX_VOICE_HZ) return -1;
  return freq;
}
