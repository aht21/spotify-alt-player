import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Artist } from "../../../types";
import plusIcon from "../../../assets/icons/plus_circle.svg";
import playIcon from "../../../assets/icons/play_alt.svg";
import pauseIcon from "../../../assets/icons/pause_alt.svg";
import { fetchUserProfile } from "../../../services/api/user";
import { fetchPlayCollection } from "../../../services/api/library";
import { fetchPlaybackPause } from "../../../services/api/player";
import { formatDate } from "../../../utils/date";
import PlayingAnimation from "../../playingAnimation";
import SaveMarkerIcon from "../../saveMarkerIcon";
import styles from "./likedTrack.module.css";

interface Props {
  num: number;
  imageSrc: string;
  name: string;
  artists: Artist[];
  album: {
    name: string;
  };
  addedAt: string;
  durationMs: number;
  isActive: boolean;
}

// TODO: сделать прокручивание названия трека и артистов

const LikedTrack = ({
  num,
  imageSrc,
  name,
  artists,
  album,
  addedAt,
  durationMs,
  isActive,
}: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  const pauseMutation = useMutation({
    mutationFn: fetchPlaybackPause,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playback-state"] }),
  });

  if (isLoading) return;
  if (isError || !data) return;

  const onPlay = () => {
    fetchPlayCollection(data.id, num - 1);
  };

  const onSaveRemove = () => {};

  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);

  return (
    <div className={styles.track}>
      <div className={styles.section}>
        <div className={styles.number_wrapper}>
          {isActive ? (
            <>
              <span className={styles.number}>
                <PlayingAnimation />
              </span>
              <button className={styles.play} onClick={() => pauseMutation.mutate()}>
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
          <span className={`${isActive && styles.name_active}`}>{name}</span>
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

export default LikedTrack;
