import { useRef } from "react";
import type { Artist } from "../../../types/player.ts";
import SaveMarker from "../../saveMarker/SaveMarker.tsx";
import styles from "./currentTrack.module.css";

interface Props {
  name: string;
  artists: Artist[];
  imageSrc: string;
  uri: string;
}

const CurrentTrack = ({ name, artists, imageSrc, uri }: Props) => {
  const trackNameRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  // TODO: сделать скроллинг ников и названия
  return (
    <div className={styles.current_track_wrapper}>
      <img src={imageSrc} alt="" className={styles.image} />
      <div className={styles.info}>
        <span
          //   ${trackScrolling ? "track_name_scrolling" : ""}
          className={`${styles.track_name}`}
          ref={trackNameRef}
        >
          {name}
        </span>
        <div
          //   ${artistScrolling ? "artists_list_scrolling" : ""}
          className={`${styles.artists_list}`}
          ref={artistRef}
        >
          {artists.map((artist, index) => (
            <span className={styles.artist_item} key={artist.id}>
              {artist.name}
              {index < artists.length - 1 && ","}
            </span>
          ))}
        </div>
      </div>
      <SaveMarker uri={uri} />
    </div>
  );
};

export default CurrentTrack;
