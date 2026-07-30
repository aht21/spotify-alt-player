import { createFileRoute } from "@tanstack/react-router";
import UserStuff from "../../components/userStuff";
import Playlists from "../../components/playlists";
import styles from "./index.module.css";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div className={styles.app_content}>
      <UserStuff />
      <Playlists />
    </div>
  );
}
