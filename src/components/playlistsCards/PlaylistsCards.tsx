import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "../../services/api/playlists.ts";
import SavedTracksCard from "./savedTracksCard";
import PlayListCard from "./playlistCard";
import styles from "./playlistsCards.module.css";
import usePlayback from "../../hooks/usePlayback.ts";

const LIKED_SONGS_URI = "spotify:playlist:37i9dQZF1F5p3rmiWPIYgZ";

const PlaylistsCards = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchUserPlaylists,
  });

  const { data: playbackData } = usePlayback((playbackData) => ({
    context: playbackData?.context,
    isPlaying: playbackData?.is_playing,
    device: playbackData?.device,
  }));

  if (isLoading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 13 }).map((_, index) => (
          <div className={styles.loading_card} key={index}>
            <div className={styles.loading_image}></div>
            <div className={styles.loading_name}></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || isError) {
    return;
  }

  return (
    <div className={styles.list}>
      <SavedTracksCard
        uri={LIKED_SONGS_URI}
        isActive={playbackData?.context?.uri === LIKED_SONGS_URI}
        isPlaying={playbackData?.isPlaying || false}
      />
      {data.items.map((item) => (
        <PlayListCard
          key={item.id}
          uri={item.uri}
          name={item.name}
          imageUrl={item.images[0].url}
          isActive={playbackData?.context?.uri === item.uri}
          isPlaying={playbackData?.isPlaying || false}
        />
      ))}
    </div>
  );
};

export default PlaylistsCards;
