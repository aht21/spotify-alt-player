import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "../../services/api/playlists.ts";
import styles from "./playlists.module.css";

const Playlists = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchUserPlaylists,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data || isError) {
    return <div>error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Playlists</h1>
      <div className={styles.list}>
        {data.items.map((item) => (
          <div className={styles.item} key={item.id}>
            <img src={item.images[0].url} alt="" className={styles.item_image} />
            <span className={styles.item_name}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
