import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../../services/auth";
import ProfilePreview from "../../components/profilePreview";
import Playback from "../../components/playback";
import styles from "./index.module.css";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/preview",
      });
    }
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div className={styles.app}>
      <div className={styles.header_wrapper}>
        <span className={styles.brand}>Spotify / alt player</span>
        <ProfilePreview />
      </div>
      <div className={styles.app_content}>
        <Outlet />
      </div>
      <div className={styles.playback_wrapper}>
        <Playback />
      </div>
    </div>
  );
}
