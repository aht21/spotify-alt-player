import CurrentTrack from "../currentTrack";
import styles from "./playback.module.css";

const Playback = () => {
  return (
    <div className={styles.player}>
      <div className={styles.player_inner}>
        <CurrentTrack />
        <div className={styles.controllers_wrapper}>
          {/* <PlaybackControllers /> */}
          {/* <PlaybackRange /> */}
        </div>
        <div className={styles.playback_settings}>
          {/* <PlaybackDevice /> */}
          {/* <VolumeController /> */}
        </div>
      </div>
    </div>
  );
};

export default Playback;
