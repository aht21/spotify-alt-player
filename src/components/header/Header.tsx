import ProfilePreview from "../profilePreview";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>Spotify / alt player</span>
      <ProfilePreview />
    </div>
  );
};

export default Header;
