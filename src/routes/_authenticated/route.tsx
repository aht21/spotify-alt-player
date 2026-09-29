import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../../services/auth";
import ThemeProvider from "../../context/themeProvider";
import ProfilePreview from "../../components/profilePreview";
import Playback from "../../components/playback";
import styles from "./index.module.css";
import usePlayback from "../../hooks/usePlayback";
import ActiveDevice from "../../components/activeDevice";

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
  const { data, isLoading } = usePlayback((playbackData) => ({
    device: playbackData?.device,
  }));

  return (
    <ThemeProvider>
      <div className={styles.wrapper}>
        {!isLoading && data?.device === undefined ? <ActiveDevice /> : null}

        <div className={styles.app}>
          <div className={styles.header_wrapper}>
            <Link to={"/"} className={styles.brand}>
              Spotify / alt player
            </Link>
            <ProfilePreview />
          </div>
          <div className={styles.app_content}>
            <Outlet />
          </div>
          <div className={styles.playback_wrapper}>
            <Playback />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
