import type { Artist } from "../../../types";
import { formatDate } from "../../../utils/date";
import usePlaybackActions from "../../../hooks/usePlaybackActions";
import plusIcon from "../../../assets/icons/plus_circle.svg";
import playIcon from "../../../assets/icons/play_alt.svg";
import pauseIcon from "../../../assets/icons/pause_alt.svg";
import PlayingAnimation from "../../playingAnimation";
import SaveMarkerIcon from "../../saveMarkerIcon";
import styles from "./playlistTrack.module.css";

interface Props {
  num: number;
  uri: string;
  imageSrc: string;
  name: string;
  artists: Artist[];
  album: {
    name: string;
  };
  addedAt: string;
  durationMs: number;
  isPlayable: boolean;
  isActive: boolean;
}

// TODO: сделать прокручивание названия трека и артистов

const PlaylistTrack = ({
  num,
  uri,
  imageSrc,
  name,
  artists,
  album,
  addedAt,
  durationMs,
  isPlayable,
  isActive,
}: Props) => {
  const { play, pause } = usePlaybackActions();

  const onPlay = () => {
    play({ uri: uri, offset: num - 1 });
  };

  const onSaveRemove = () => {};

  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);

  if (!isPlayable) {
    return (
      <div className={`${styles.track} ${styles.unplayable}`}>
        <div className={styles.section}>
          <div className={styles.number_wrapper}>-</div>
          <img className={styles.image} src={imageSrc} />
          <div className={styles.info}>
            <span className={`${styles.name} ${styles.name_unplayable}`}>{name}</span>
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
          <span className={styles.album_name}>{album.name}</span>
        </div>
        <div className={styles.section}>
          <span className={styles.added_ago}>{formatDate(addedAt)}</span>
        </div>
        <div className={styles.section}>
          <button
            className={`${styles.save_button} ${styles.save_button_unplayable}`}
            onClick={onSaveRemove}
            // disabled={saveMutation.isPending || removeMutation.isPending}
          >
            {true ? (
              <SaveMarkerIcon height="1.3rem" width="1.3rem" />
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
  }

  return (
    <div className={styles.track}>
      <div className={styles.section}>
        <div className={styles.number_wrapper}>
          {isActive ? (
            <>
              <span className={styles.number}>
                <PlayingAnimation />
              </span>
              <button className={styles.play} onClick={() => pause()}>
                <img className={styles.play_icon} src={pauseIcon} alt="" />
              </button>
            </>
          ) : (
            <>
              <span className={styles.number}>{num}</span>
              <button className={styles.play} onClick={onPlay}>
                <img className={styles.play_icon} src={playIcon} alt="" />
              </button>
            </>
          )}
        </div>
        <img className={styles.image} src={imageSrc} />
        <div className={styles.info}>
          <span className={`${isActive && styles.name_active} ${styles.name}`}>{name}</span>
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
        <span className={styles.album_name}>{album.name}</span>
      </div>
      <div className={styles.section}>
        <span className={styles.added_ago}>{formatDate(addedAt)}</span>
      </div>
      <div className={styles.section}>
        <button
          className={styles.save_button}
          onClick={onSaveRemove}
          // disabled={saveMutation.isPending || removeMutation.isPending}
        >
          {true ? (
            <SaveMarkerIcon height="1.3rem" width="1.3rem" />
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
