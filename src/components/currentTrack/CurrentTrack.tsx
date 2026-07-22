import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaybackState } from "../../services/api/player";
import styles from "./currentTrack.module.css";
import SaveMarker from "../saveMarker/SaveMarker.tsx";

const CurrentTrack = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
  });

  const trackNameRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  console.log(data);

  if (isLoading) {
    return (
      <div className={styles.current_track_wrapper}>
        <div className={styles.image_loading}></div>
        <div className={styles.info}>
          <div className={styles.name_loading}></div>
          <div className={styles.artists_loading}></div>
        </div>
      </div>
    );
  }

  // TODO: поменять надпись (возможно проблема с тем что не выбран device воспроизведения)
  if (data?.item === undefined) return <div>Трек не найден</div>;

  if (isError || data?.item === null) return <div>Ошибка</div>;

  return (
    <div className={styles.current_track_wrapper}>
      <img src={data.item.album.images[1].url} alt="" className={styles.image} />
      <div className={styles.info}>
        <span
          //   ${trackScrolling ? "track_name_scrolling" : ""}
          className={`${styles.track_name}`}
          ref={trackNameRef}
        >
          {data.item.name}
        </span>
        <div
          //   ${artistScrolling ? "artists_list_scrolling" : ""}
          className={`${styles.artists_list}`}
          ref={artistRef}
        >
          {data.item.artists.map((artist) => (
            <span className={styles.artist_item} key={artist.id}>
              {artist.name}
            </span>
          ))}
        </div>
      </div>
      <SaveMarker uri={data.item.uri} />
    </div>
  );
};

export default CurrentTrack;
