import styles from "./playingAnimation.module.css";

const PlayingAnimation = () => (
  <div className={styles.equalizer} aria-label="Playing">
    <span className={styles.bar} />
    <span className={styles.bar} />
    <span className={styles.bar} />
    <span className={styles.bar} />
  </div>
);

export default PlayingAnimation;
