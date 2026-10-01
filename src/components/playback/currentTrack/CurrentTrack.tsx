import type { Artist } from "../../../types";
import expandIcon from "../../../assets/icons/expand.svg";
import SaveMarker from "../../saveMarker/SaveMarker.tsx";
import { useMarquee } from "../../../hooks/useMarquee";
import styles from "./currentTrack.module.css";

interface Props {
  name: string;
  artists: Artist[];
  imageSrc: string;
  uri: string;
  onToggleExpand: () => void;
}

const CurrentTrack = ({ name, artists, imageSrc, uri, onToggleExpand }: Props) => {
  const nameMarquee = useMarquee({ speed: 10, pause: 5, deps: [name] });
  const artistsMarquee = useMarquee({ speed: 10, pause: 5, deps: [artists] });

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
        <div
          ref={nameMarquee.containerRef}
          className={styles.marquee}
          onMouseEnter={nameMarquee.handleMouseEnter}
          onMouseLeave={nameMarquee.handleMouseLeave}
        >
          <span
            ref={nameMarquee.contentRef as React.RefObject<HTMLSpanElement>}
            className={styles.track_name}
          >
            {name}
          </span>
        </div>

        <div
          ref={artistsMarquee.containerRef}
          className={styles.marquee}
          onMouseEnter={artistsMarquee.handleMouseEnter}
          onMouseLeave={artistsMarquee.handleMouseLeave}
        >
          <div ref={artistsMarquee.contentRef} className={styles.artists_list}>
            {artists.map((artist, index) => (
              <span className={styles.artist_item} key={artist.id}>
                {artist.name}
                {index < artists.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SaveMarker uri={uri} />
    </div>
  );
};

export default CurrentTrack;
