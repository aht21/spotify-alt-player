import SavedTracksCard from "./savedTracksCard";
import styles from "./userStuff.module.css";

const UserStuff = () => {
  return (
    <div className={styles.user_stuff}>
      <h1 className={styles.header}>Your stuff</h1>
      <div className={styles.cards_list}>
        <SavedTracksCard />
      </div>
    </div>
  );
};

export default UserStuff;
