import type { LibraryTrack } from "../../types/library";
import LikedTrack from "./likedTrack";
import styles from "./likedTracks.module.css";

interface Props {
  items: LibraryTrack[];
}

const LikedTracks = ({ items }: Props) => {
  return (
    <div className={styles.liked_tracks}>
      {items.map((item, index) => (
        <LikedTrack
          key={index}
          num={index}
          imageSrc={item.track.album.images[1].url}
          name={item.track.name}
          artists={item.track.artists}
          durationMs={item.track.duration_ms}
        />
      ))}
    </div>
  );
};

export default LikedTracks;
