import { useRef } from "react";
import type { Artist } from "../../../types";
import expandIcon from "../../../assets/icons/expand.svg";
import SaveMarker from "../../saveMarker/SaveMarker.tsx";
import styles from "./currentTrack.module.css";

interface Props {
  name: string;
  artists: Artist[];
  imageSrc: string;
  uri: string;
  onToggleExpand: () => void;
}

const CurrentTrack = ({ name, artists, imageSrc, uri, onToggleExpand }: Props) => {
  const trackNameRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  // TODO: сделать скроллинг ников и названия
  return (
    <div className={styles.current_track_wrapper}>
      <div className={styles.image_wrapper}>
        <img src={imageSrc} alt="" className={styles.image} />
        <div className={styles.expand_button_wrapper}>
          <button className={styles.expand_button} onClick={onToggleExpand}>
            <img src={expandIcon} alt="" className={styles.expand_icon} />
          </button>
        </div>
      </div>
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
