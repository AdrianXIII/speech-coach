"use client";

import { useCallback, useRef, useState } from "react";

export interface UseMediaRecorderResult {
  isRecording: boolean;
  recordedBlob: Blob | null;
  /**
   * Audio-only version of the recording, for sending to Gemini for
   * analysis. Equal to `recordedBlob` when `video` is false; when `video`
   * is true, captured via a separate audio-only MediaRecorder running in
   * parallel, since sending the full video costs far more tokens with no
   * analysis benefit.
   */
  audioBlob: Blob | null;
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
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioChunksRef = useRef<Blob[]>([]);

  const start = useCallback(async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video,
      });
      setStream(mediaStream);
      chunksRef.current = [];
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: video ? "video/webm" : "audio/webm",
        });
        setRecordedBlob(blob);
        if (!video) setAudioBlob(blob);
      };
      recorder.start();
      recorderRef.current = recorder;

      if (video) {
        const audioOnlyStream = new MediaStream(mediaStream.getAudioTracks());
        const audioRecorder = new MediaRecorder(audioOnlyStream);
        audioRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };
        audioRecorder.onstop = () => {
          setAudioBlob(new Blob(audioChunksRef.current, { type: "audio/webm" }));
        };
        audioRecorder.start();
        audioRecorderRef.current = audioRecorder;
      }

      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not access microphone/camera.");
    }
  }, [video]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    audioRecorderRef.current?.stop();
    stream?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  }, [stream]);

  const reset = useCallback(() => {
    setRecordedBlob(null);
    setAudioBlob(null);
    setError(null);
    chunksRef.current = [];
    audioChunksRef.current = [];
  }, []);

  return { isRecording, recordedBlob, audioBlob, stream, start, stop, reset, error };
}
