import usePlayback from "../../../hooks/usePlayback";
import styles from "./playingAnimation.module.css";

const PlayingAnimation = () => {
  const { data } = usePlayback((playbackData) => ({
    isPlaying: playbackData?.is_playing,
  }));

  return (
    <div
      className={`${styles.equalizer} ${data?.isPlaying ? "" : styles.stopped}`}
      aria-label="Playing"
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </div>
  );
};

export default PlayingAnimation;
