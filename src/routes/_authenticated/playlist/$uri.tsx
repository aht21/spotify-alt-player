import { createFileRoute } from "@tanstack/react-router";
import PlaylistTracks from "../../../components/playlistTracks";
import PlaylistHeader from "../../../components/playlistHeader";
import { getIdFromUri } from "../../../utils/uri";
import styles from "./$uri.module.css";

export const Route = createFileRoute("/_authenticated/playlist/$uri")({
  component: Playlist,
});

function Playlist() {
  const { uri } = Route.useParams();
  const id = getIdFromUri(uri);

  if (!id) return;

  return (
    <div className={styles.playlist}>
      <div className={styles.inner}>
        <PlaylistHeader id={id} uri={uri} />
        <PlaylistTracks id={id} uri={uri} />
      </div>
    </div>
  );
}
