import { createLazyFileRoute } from "@tanstack/react-router";
import { login } from "../services/auth";
import styles from "./preview.module.css";

export const Route = createLazyFileRoute("/preview")({
  component: Preview,
});

function Preview() {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${styles.preview}`}>
        <div className={styles.header}>
          <span>Spotify / </span>
          <span className={styles.header_second}> alt player</span>
        </div>
        <div className={styles.desc}>
          <p className={styles.desc_first}>
            An alternative Spotify player: familiar features with a different design. This is a pet
            project.
          </p>
          <p className={styles.desc_second}>
            Sign in with Spotify and grant read-only access to get started. I don’t collect or store
            your data — it’s only used to display your music in the app. The source code is open.
          </p>
          <p className={styles.desc_third}>
            Source code:{" "}
            <a
              className={styles.source_link}
              href="https://github.com/akht21/spotify-alt-player"
              target="_blank"
            >
              github.com/akht21/spotify-alt-player
            </a>
          </p>
        </div>
        <button className={styles.login_button} onClick={login}>
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
