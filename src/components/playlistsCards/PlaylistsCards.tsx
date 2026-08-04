import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "../../services/api/playlists.ts";
import { fetchPlaybackState } from "../../services/api/player.ts";
import SavedTracksCard from "./savedTracksCard";
import PlayListCard from "./playlistCard";
import styles from "./playlistsCards.module.css";

const PlaylistsCards = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchUserPlaylists,
  });

  const { data: playbackData } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
  });

  if (isLoading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 10 }).map((_, index) => (
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
      <SavedTracksCard isActive={playbackData?.context?.type === "collection"} />
      {data.items.map((item) => (
        <PlayListCard
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.images[0].url}
          isActive={
            playbackData?.context?.type === "playlist" && playbackData?.context?.uri === item.uri
          }
        />
      ))}
    </div>
  );
};

export default PlaylistsCards;
