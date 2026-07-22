import { createFileRoute } from "@tanstack/react-router";
import Header from "../../components/header";
import Playback from "../../components/playback";
import styles from "./index.module.css";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.app_content}>
        <div className={styles.app_content_first}>first</div>
        <div className={styles.app_content_second}>second</div>
      </div>
      <Playback />
    </div>
  );
}
