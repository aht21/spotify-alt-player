import { createFileRoute } from "@tanstack/react-router";
import PlaylistHeader from "../../../components/playlistHeader";
import styles from "./$id.module.css";
import PlaylistTracks from "../../../components/playlistTracks";

export const Route = createFileRoute("/_authenticated/playlist/$id")({
  component: Playlist,
});

function Playlist() {
  const { id } = Route.useParams();

  return (
    <div className={styles.playlist}>
      <div className={styles.inner}>
        <PlaylistHeader id={id} />
        <PlaylistTracks id={id} />
      </div>
    </div>
  );
}
