import { createFileRoute } from "@tanstack/react-router";
import LikedHeader from "../../../components/likedHeader";
import LikedTracks from "../../../components/likedTracks";
import styles from "./liked.module.css";

export const Route = createFileRoute("/_authenticated/_liked/liked")({
  component: Liked,
});

function Liked() {
  return (
    <div className={styles.saved}>
      <div className={styles.inner}>
        <LikedHeader />
        <LikedTracks />
      </div>
    </div>
  );
}
