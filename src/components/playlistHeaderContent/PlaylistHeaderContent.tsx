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
  url: string;
}

const PlaylistHeaderContent = ({ isPaused, onPlay, coverSrc, name, contributors, url }: Props) => {
  const onPlayPause = () => {
    if (isPaused) {
      onPlay();
    }
  };

  return (
    <div className={styles.header}>
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
        <div className={styles.buttons_group}>
          <button className={styles.play_button} onClick={onPlayPause}>
            <img
              src={isPaused ? playIcon : pauseIcon}
              alt=""
              className={styles.play_button_image}
            />
            <span>Listen</span>
          </button>
          <a href={url} target="_blank" className={styles.url_link}>
            <span>Open in Spotify</span>
            <img className={styles.url_link_image} src={linkIcon} alt="" />
          </a>
        </div>
        {/* <span className={styles.info}>97 songs, 4hr 13min</span> */}
      </div>
    </div>
  );
};

export default PlaylistHeaderContent;
