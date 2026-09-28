import { Link } from "@tanstack/react-router";
import playIcon from "../../../assets/icons/play.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import likedCover from "../../../assets/images/liked_songs.png";
import usePlaybackActions from "../../../hooks/usePlaybackActions";
import styles from "./savedTracksCard.module.css";

interface Props {
  uri: string;
  isActive: boolean;
  isPlaying: boolean;
}

const SavedTracksCard = ({ uri, isActive, isPlaying }: Props) => {
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
          <img src={likedCover} className={styles.image} />
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
          <span className={`${styles.name} ${isActive && styles.active_name}`}>Saved tracks</span>
        </div>
      </div>
    </Link>
  );
};

export default SavedTracksCard;
