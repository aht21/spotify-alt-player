import { useRef } from "react";
import styles from "./range.module.css";

interface Props {
  progressMs: number;
  durationMs: number;
}

const Range = ({ progressMs, durationMs }: Props) => {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.overflow}>
      <span className={styles.number}>{formatTime(progressMs)}</span>
      <input
        className={styles.range}
        ref={rangeInputRef}
        type="range"
        id="playback_range"
        name="playback_range"
        min="0"
        max="100"
      />
      <span className={styles.number}>{formatTime(durationMs)}</span>
    </div>
  );
};

export default Range;
