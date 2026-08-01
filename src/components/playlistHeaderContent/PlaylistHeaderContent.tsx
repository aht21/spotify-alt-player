import { Link } from "@tanstack/react-router";
import arrowIcon from "../../assets/icons/chevron_left.svg";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import linkIcon from "../../assets/icons/external_link.svg";
import styles from "./playlistHeaderContent.module.css";

interface Props {
  isPaused: boolean;
  onPlay: () => void;
  coverSrc: string;
  name: string;
  contributors: {
    name: string;
    url: string;
    // imageSrc: string;
  }[];
}

const PlaylistHeaderContent = ({ isPaused, onPlay, coverSrc, name, contributors }: Props) => {
  const onPlayPause = () => {
    if (isPaused) {
      onPlay();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.controllers}>
        <Link to="/" className={styles.button_move}>
          <img src={arrowIcon} className={styles.button_back_image} />
        </Link>
        <button className={styles.button_move} disabled={true}>
          <img src={arrowIcon} className={styles.button_front_image} />
        </button>
      </div>
      <div className={styles.label}>
        <img src={coverSrc} className={styles.cover} />
        <div className={styles.content}>
          <span className={styles.type}>Playlist</span>
          <h1 className={styles.name}>{name}</h1>
          <div className={styles.contributors}>
            {contributors.map((item, index) => (
              <a href={item.url} target="_blank" className={styles.contributor} key={index}>
                {/* <img className={styles.contributor_avatar} src={item.imageSrc} alt="" /> */}
                <span>{item.name}</span>
                <img className={styles.contributor_link_icon} src={linkIcon} alt="" />
              </a>
            ))}
          </div>
          <button className={styles.play_button} onClick={onPlayPause}>
            <img
              src={isPaused ? playIcon : pauseIcon}
              alt=""
              className={styles.play_button_image}
            />
            <span>Listen</span>
          </button>
          {/* <span className={styles.info}>97 songs, 4hr 13min</span> */}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeaderContent;
