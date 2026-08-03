import type { Artist } from "../../../types";
import playIcon from "../../../assets/icons/play_alt.svg";
import checkIcon from "../../../assets/icons/check_circle_solid.svg";
import plusIcon from "../../../assets/icons/plus_circle.svg";
import styles from "./playlistTrack.module.css";

interface Props {
  num: number;
  imageSrc: string;
  name: string;
  artists: Artist[];
  durationMs: number;
}

const PlaylistTrack = ({ num, imageSrc, name, artists, durationMs }: Props) => {
  const onPlay = () => {};
  const onSaveRemove = () => {};

  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);

  return (
    <div className={styles.track}>
      <div className={styles.section}>
        <div className={styles.number_wrapper}>
          <span className={styles.number}>{num + 1}</span>
          <button className={styles.play} onClick={onPlay}>
            <img className={styles.play_icon} src={playIcon} alt="" />
          </button>
        </div>
        <img className={styles.image} src={imageSrc} />
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.artists_list}>
            {artists.map((artist, index) => (
              <span className={styles.artist} key={artist.id}>
                {artist.name}
                {index < artists.length - 1 && ","}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.section}>
        <button
          className={styles.save_button}
          onClick={onSaveRemove}
          // disabled={saveMutation.isPending || removeMutation.isPending}
        >
          {true ? (
            <img src={checkIcon} alt="" className={styles.saved_image} />
          ) : (
            <img src={plusIcon} alt="" className={styles.save_image} />
          )}
        </button>
        <span
          className={styles.duration}
        >{`${durationMin} : ${String(durationSec).padStart(2, "0")}`}</span>
      </div>
    </div>
  );
};

export default PlaylistTrack;
