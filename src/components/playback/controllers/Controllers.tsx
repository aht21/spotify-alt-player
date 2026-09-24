import nextIcon from "../../../assets/icons/next.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import playIcon from "../../../assets/icons/play.svg";
import { usePlaybackContext } from "../../../context/playbackProvider";
import ShuffleIcon from "../../shuffleIcon";
import styles from "./controllers.module.css";
import RepeatIcon from "../../repeatIcon/RepeatIcon.tsx";

const Controllers = () => {
  const { pause, resume, prev, next, shuffle, repeat, isPlaying, repeatState, shuffleState } =
    usePlaybackContext();

  const onPlayPause = () => (isPlaying ? pause() : resume());

  const isMutating = false;

  return (
    <div className={styles.wrapper}>
      <button
        disabled={false}
        className={shuffleState ? styles.control_button_active : styles.control_button}
        onClick={shuffle}
      >
        <ShuffleIcon width="1.2rem" height="1.2rem" variant={shuffleState ? "white" : "primary"} />
      </button>

      <div className={styles.move_controls}>
        <button disabled={isMutating} className={styles.control_button} onClick={prev}>
          <img src={nextIcon} className={styles.prev_icon} alt="" />
        </button>

        <button disabled={isMutating} className={styles.pause} onClick={onPlayPause}>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            className={styles.pause_icon}
            alt={isPlaying ? "pause" : "play"}
          />
        </button>

        <button disabled={isMutating} className={styles.control_button} onClick={next}>
          <img src={nextIcon} className={styles.next_icon} alt="" />
        </button>
      </div>

      <button
        disabled={false}
        className={repeatState !== "off" ? styles.control_button_active : styles.control_button}
        onClick={repeat}
      >
        <RepeatIcon width="1.2rem" height="1.2rem" variant={repeatState} />
      </button>
    </div>
  );
};

export default Controllers;
