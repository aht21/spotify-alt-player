import { Link } from "@tanstack/react-router";
import playIcon from "../../../assets/icons/play.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import usePlaybackActions from "../../../hooks/usePlaybackActions";
import styles from "./playlistCard.module.css";

interface Props {
  uri: string;
  imageUrl: string;
  name: string;
  isActive: boolean;
  isPlaying: boolean;
}

const PlayListCard = ({ uri, imageUrl, name, isActive, isPlaying }: Props) => {
  const { pause, resume, play } = usePlaybackActions();

  const onPlayPauseLibrary = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isPlaying && isActive) pause();
    else if (isActive) resume();
    else play({ uri });
  };

  return (
    <Link to={"/playlist/$uri"} params={{ uri }}>
      <div className={styles.card}>
        <div className={`${styles.image_wrapper} ${isActive && isPlaying && styles.active_image}`}>
          <img src={imageUrl} alt="" className={styles.image} />
          <button
            className={`${styles.play_button} ${isActive && styles.active_button}`}
            onClick={onPlayPauseLibrary}
          >
            <img
              src={isActive && isPlaying ? pauseIcon : playIcon}
              className={styles.play_button_image}
              alt=""
            />
          </button>
        </div>
        <div className={styles.name_wrapper}>
          <span className={`${styles.name} ${isActive && styles.active_name}`}>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default PlayListCard;
