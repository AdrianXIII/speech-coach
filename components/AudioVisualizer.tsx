"use client";

import { useEffect, useRef } from "react";
import { createAudioAnalyser, getVolumeLevel } from "@/lib/audio";

interface AudioVisualizerProps {
  stream: MediaStream | null;
  active: boolean;
}

/** Live volume-level bar driven by the Web Audio API while recording. */
export function AudioVisualizer({ stream, active }: AudioVisualizerProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream || !active) return;

    const { analyser, audioContext } = createAudioAnalyser(stream);

    const tick = () => {
      const level = getVolumeLevel(analyser);
      if (barRef.current) {
        barRef.current.style.width = `${Math.min(level * 200, 100)}%`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      audioContext.close();
    };
  }, [stream, active]);

  return (
    <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
      <div
        ref={barRef}
        className="h-full w-0 rounded-full bg-indigo-500 transition-[width] duration-75"
      />
    </div>
  );
}
