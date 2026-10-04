import { createFileRoute } from "@tanstack/react-router";
import PlaylistTracks from "../../../components/playlistTracks";
import PlaylistHeader from "../../../components/playlistHeader";
import { getIdFromUri } from "../../../utils/uri";
import styles from "./$uri.module.css";
import useUserProfile from "../../../hooks/useUserProfile";
import usePlaylist from "../../../hooks/usePlaylist";

export const Route = createFileRoute("/_authenticated/playlist/$uri")({
  component: Playlist,
});

function Playlist() {
  const { uri } = Route.useParams();
  const id = getIdFromUri(uri);

  const { data: userData, isLoading: isUserLoading } = useUserProfile((data) => ({
    id: data.id,
  }));
  const { data: playlistData, isLoading: isPlaylistLoading } = usePlaylist(String(id), (data) => ({
    id: data.owner.id,
  }));

  if (!id) return;

  const isLoading = isUserLoading || isPlaylistLoading;
  const isOwnPlaylist = userData?.id !== undefined && userData.id === playlistData?.id;

  return (
    <div className={styles.playlist}>
      <div className={styles.inner}>
        <PlaylistHeader id={id} uri={uri} />
        {isLoading ? null : isOwnPlaylist ? (
          <PlaylistTracks id={id} uri={uri} />
        ) : (
          <div className={styles.no_data}>
            <span>
              Sorry, Spotify doesn't expose track lists for other users' playlists through the API
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
