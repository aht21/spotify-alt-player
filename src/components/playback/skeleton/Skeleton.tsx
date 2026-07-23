import styles from "./skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.player}>
      <div className={styles.player_inner}>
        <div className={styles.current_track}>
          <div className={`${styles.skeleton_item} ${styles.image}`} />

          <div className={styles.info}>
            <div className={`${styles.skeleton_item} ${styles.name}`} />
            <div className={`${styles.skeleton_item} ${styles.artist}`} />
          </div>
        </div>

        <div className={styles.controllers_wrapper}>
          <div className={styles.controllers}>
            <div className={`${styles.skeleton_item} ${styles.skip}`} />
            <div className={`${styles.skeleton_item} ${styles.pause}`} />
            <div className={`${styles.skeleton_item} ${styles.skip}`} />
          </div>

          <div className={`${styles.skeleton_item} ${styles.range}`} />
        </div>

        <div className={styles.settings}>
          <div className={`${styles.skeleton_item} ${styles.icon}`} />
          <div className={`${styles.skeleton_item} ${styles.icon}`} />
          <div className={`${styles.skeleton_item} ${styles.volume}`} />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
