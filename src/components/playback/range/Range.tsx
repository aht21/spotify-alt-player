import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchPlaybackSeek } from "../../../services/api/player";

import styles from "./range.module.css";

interface Props {
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
}

const PROGRESS_UPDATE_INTERVAL = 100;

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Range = ({ progressMs, durationMs, isPlaying }: Props) => {
  const queryClient = useQueryClient();

  const [displayedProgressMs, setDisplayedProgressMs] = useState(progressMs);
  const [isDragging, setIsDragging] = useState(false);

  // synchronize Spotify
  useEffect(() => {
    if (!isDragging) {
      setDisplayedProgressMs(progressMs);
    }
  }, [progressMs, isDragging]);

  // local range moving
  useEffect(() => {
    if (!isPlaying || isDragging || durationMs === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setDisplayedProgressMs((prev) => Math.min(prev + PROGRESS_UPDATE_INTERVAL, durationMs));
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [durationMs, isDragging, isPlaying]);

  // reach end of track
  useEffect(() => {
    if (durationMs === 0 || isDragging || !isPlaying) {
      return;
    }

    if (displayedProgressMs < durationMs) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["playback-state"],
    });
  }, [displayedProgressMs, durationMs, isDragging, isPlaying, queryClient]);

  const seekMutation = useMutation({
    mutationFn: fetchPlaybackSeek,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["playback-state"],
      });

      setIsDragging(false);
    },
    onError: () => {
      setIsDragging(false);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDragging(true);

    const percent = Number(event.target.value);

    setDisplayedProgressMs((percent / 100) * durationMs);
  };

  const handleSeek = () => {
    seekMutation.mutate(Math.round(displayedProgressMs));
  };

  const progressPercent = durationMs === 0 ? 0 : (displayedProgressMs / durationMs) * 100;

  return (
    <div className={styles.overflow}>
      <span className={styles.number}>{formatTime(displayedProgressMs)}</span>

      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={progressPercent}
        onChange={handleChange}
        onMouseUp={handleSeek}
        onTouchEnd={handleSeek}
        style={
          {
            "--progress": `${progressPercent}%`,
          } as React.CSSProperties
        }
      />

      <span className={styles.number}>{formatTime(durationMs)}</span>
    </div>
  );
};

export default Range;
