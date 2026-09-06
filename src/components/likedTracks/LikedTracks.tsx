import { useQuery } from "@tanstack/react-query";
import type { LibraryTrack } from "../../types/library";
import { fetchPlaybackState } from "../../services/api/player";
import LikedTrack from "./likedTrack";
import styles from "./likedTracks.module.css";

interface Props {
  items: LibraryTrack[];
}

const LikedTracks = ({ items }: Props) => {
  const { data: playbackData } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
  });

  console.log(playbackData, items);

  return (
    <div className={styles.liked_tracks}>
      <div className={styles.legend}>
        <div className={styles.info}>
          <span className={styles.number}>#</span>
          <span className={styles.title}>Title</span>
        </div>
        <span className={styles.album}>Album</span>
        <span className={styles.time_added}>Date added</span>
        <span className={styles.duration}>Time</span>
      </div>
      {items.map((item, index) => (
        <LikedTrack
          key={index}
          num={index}
          imageSrc={item.track.album.images[1].url}
          name={item.track.name}
          artists={item.track.artists}
          album={item.track.album}
          addedAt={item.added_at}
          durationMs={item.track.duration_ms}
          isActive={playbackData?.item?.id === item.track.id}
        />
      ))}
    </div>
  );
};

export default LikedTracks;
