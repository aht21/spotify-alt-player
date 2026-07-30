import { Link } from "@tanstack/react-router";
import arrow from "../../assets/icons/chevron_left.svg";
import styles from "./playlistHeaderContent.module.css";

interface Props {
  coverSrc: string;
  name: string;
  contributors: {
    name: string;
    url: string;
    imageSrc: string;
  }[];
}

const PlaylistHeaderContent = ({ coverSrc, name, contributors }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.controllers}>
        <Link to="/" className={styles.button_move}>
          <img src={arrow} className={styles.button_back_image} />
        </Link>
        <button className={styles.button_move} disabled={true}>
          <img src={arrow} className={styles.button_front_image} />
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
                <img className={styles.contributor_avatar} src={item.imageSrc} alt="" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
          <span className={styles.info}>97 songs, 4hr 13min</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeaderContent;
