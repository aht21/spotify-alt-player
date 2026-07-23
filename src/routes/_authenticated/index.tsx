import { createFileRoute } from "@tanstack/react-router";
import Brand from "../../components/brand";
import ProfilePreview from "../../components/profilePreview";
import UserStuff from "../../components/userStuff";
import Playlists from "../../components/playlists";
import Playback from "../../components/playback";
import styles from "./index.module.css";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div className={styles.app}>
      <div className={styles.brand_wrapper}>
        <Brand />
      </div>
      <div className={styles.profile_preview_wrapper}>
        <ProfilePreview />
      </div>
      <div className={styles.app_content}>
        <UserStuff />
        <Playlists />
      </div>
      <div className={styles.playback_wrapper}>
        <Playback />
      </div>
    </div>
  );
}
