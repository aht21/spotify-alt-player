import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../../services/auth";
import Brand from "../../components/brand";
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
      <div className={styles.brand_wrapper}>
        <Brand />
      </div>
      <div className={styles.profile_preview_wrapper}>
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
