import usePlayback from "../../hooks/usePlayback";
import minimiseIcon from "../../assets/icons/minimise.svg";
import styles from "./bigPlayback.module.css";

interface Props {
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const BigPlayback = ({ isExpanded, onToggleExpand }: Props) => {
  const { data, isLoading } = usePlayback((playbackData) => ({
    item: playbackData?.item,
    isPlaying: playbackData?.is_playing,
    progressMs: playbackData?.progress_ms,
    device: playbackData?.device,
  }));

  if (!data || !data.item) return;

  return (
    <div className={`${styles.playback_wrapper} ${isExpanded ? styles.playback_wrapper_open : ""}`}>
      <button className={styles.minimize_button} onClick={onToggleExpand}>
        <img className={styles.minimize_icon} src={minimiseIcon} alt="" />
      </button>
      <div className={styles.playback}>
        <img className={styles.cover} src={data.item.album.images[0].url} alt="" />
        <div className={styles.info}>
          <span className={styles.name}>{data.item.name}</span>
          <span className={styles.artists_list}>
            {data.item.artists.map((artist, index) => (
              <span className={styles.artist_item} key={artist.id}>
                {artist.name}
                {index < data.item!.artists.length - 1 && ","}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BigPlayback;
