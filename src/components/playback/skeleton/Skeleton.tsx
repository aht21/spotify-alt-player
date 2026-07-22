import styles from "./skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.player}>
      <div className={styles.player_inner}>
        {/* current track */}
        <div className={styles.current_track_wrapper}>
          <div className={styles.image_loading}></div>
          <div className={styles.info}>
            <div className={styles.name_loading}></div>
            <div className={styles.artists_loading}></div>
          </div>
        </div>
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

export default Skeleton;
