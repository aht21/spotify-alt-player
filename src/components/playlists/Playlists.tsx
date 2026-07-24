import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "../../services/api/playlists.ts";
import styles from "./playlists.module.css";
import PlayListCard from "./playlistCard/PlaylistCard.tsx";

const Playlists = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchUserPlaylists,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Playlists</h1>
        <div className={styles.list}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className={styles.loading_card} key={index}>
              <div className={styles.loading_image}></div>
              <div className={styles.loading_name}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || isError) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Playlists</h1>
      <div className={styles.list}>
        {data.items.map((item) => (
          <PlayListCard key={item.id} id={item.id} name={item.name} imageUrl={item.images[0].url} />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
