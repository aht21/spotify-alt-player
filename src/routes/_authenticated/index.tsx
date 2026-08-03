import { createFileRoute } from "@tanstack/react-router";
import PlaylistsCards from "../../components/playlistsCards";
import styles from "./index.module.css";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div className={styles.app_content}>
      <section className={styles.section}>
        <h1 className={styles.section_header}>Your stuff</h1>
        <PlaylistsCards />
      </section>
    </div>
  );
}
