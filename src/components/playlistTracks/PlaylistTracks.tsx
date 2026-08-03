import { useQuery } from "@tanstack/react-query";
import { fetchPlaylistItems } from "../../services/api/playlists";
import PlaylistTrack from "./playlistTrack";
import styles from "./playlistTracks.module.css";

interface Props {
  id: string;
}

const PlaylistTracks = ({ id }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlist-songs", id],
    queryFn: () => fetchPlaylistItems(id, 50, 0),
  });
  console.log(data);

  if (isLoading || isError || !data) return;

  return (
    <div className={styles.playlist_tracks}>
      {data.items.map((item, index) => (
        <PlaylistTrack
          key={index}
          num={index}
          imageSrc={item.item.album.images[1].url}
          name={item.item.name}
          artists={item.item.artists}
          durationMs={item.item.duration_ms}
        />
      ))}
    </div>
  );
};

export default PlaylistTracks;
