"use client";

import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioVisualizer } from "@/components/AudioVisualizer";

interface RecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  video?: boolean;
}

/** Recording control panel: start/stop, live level meter, hand-off of the finished blob. */
export function Recorder({ onRecordingComplete, video = false }: RecorderProps) {
  const { isRecording, recordedBlob, stream, start, stop, reset, error } =
    useMediaRecorder(video);

  const handleStop = () => {
    stop();
    if (recordedBlob) onRecordingComplete?.(recordedBlob);
  };

  return (
    <Card className="flex flex-col items-center gap-4">
      <AudioVisualizer stream={stream} active={isRecording} />

      <div className="flex gap-3">
        {!isRecording ? (
          <Button onClick={start}>Start recording</Button>
        ) : (
          <Button variant="danger" onClick={handleStop}>
            Stop recording
          </Button>
        )}
        {recordedBlob && !isRecording && (
          <Button variant="secondary" onClick={reset}>
            Discard
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </Card>
  );
}
