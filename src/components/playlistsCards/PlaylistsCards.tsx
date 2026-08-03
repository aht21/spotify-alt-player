import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "../../services/api/playlists.ts";
import SavedTracksCard from "./savedTracksCard";
import PlayListCard from "./playlistCard";
import styles from "./playlistsCards.module.css";

const PlaylistsCards = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchUserPlaylists,
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

  console.log(data);

  return (
    <div className={styles.list}>
      <SavedTracksCard />
      {data.items.map((item) => (
        <PlayListCard key={item.id} id={item.id} name={item.name} imageUrl={item.images[0].url} />
      ))}
    </div>
  );
};

export default PlaylistsCards;
