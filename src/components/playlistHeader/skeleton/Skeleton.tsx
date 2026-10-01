import styles from "./skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.header}>
      <div className={`${styles.cover} ${styles.skeleton}`}></div>
      <div className={styles.content}>
        <div className={styles.content_first}>
          <span className={`${styles.type} ${styles.skeleton}`}></span>
          <span className={`${styles.name} ${styles.skeleton}`}></span>
          <span className={`${styles.descr} ${styles.skeleton}`}></span>
          <div className={styles.contributors_list}>
            <div className={`${styles.contributor_1} ${styles.skeleton}`}></div>
            <div className={`${styles.contributor_2} ${styles.skeleton}`}></div>
          </div>
        </div>
        <div className={styles.buttons_group}>
          <div className={`${styles.button_play} ${styles.skeleton}`}></div>
          <div className={`${styles.button_external} ${styles.skeleton}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
