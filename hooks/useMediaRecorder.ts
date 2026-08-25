"use client";

import { useCallback, useRef, useState } from "react";

export interface UseMediaRecorderResult {
  isRecording: boolean;
  recordedBlob: Blob | null;
  stream: MediaStream | null;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
  error: string | null;
}

/**
 * Wraps getUserMedia + MediaRecorder for capturing mic (and optionally
 * camera) input in the browser. Video capture is opt-in via `video` so the
 * recorder view can work audio-only.
 */
export function useMediaRecorder(video: boolean = false): UseMediaRecorderResult {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = useCallback(async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video,
      });
      setStream(mediaStream);
      chunksRef.current = [];

      const recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: video ? "video/webm" : "audio/webm",
        });
        setRecordedBlob(blob);
      };

      recorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not access microphone/camera.");
    }
  }, [video]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    stream?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  }, [stream]);

  const reset = useCallback(() => {
    setRecordedBlob(null);
    setError(null);
    chunksRef.current = [];
  }, []);

  return { isRecording, recordedBlob, stream, start, stop, reset, error };
}
