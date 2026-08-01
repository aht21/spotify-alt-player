import { Link } from "@tanstack/react-router";
import { fetchPlayPlaylist } from "../../../services/api/player";
import playIcon from "../../../assets/icons/play.svg";
import styles from "./playlistCard.module.css";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
}

const PlayListCard = ({ id, imageUrl, name }: Props) => {
  const onPlayPlaylist = () => {
    fetchPlayPlaylist(id);
  };

  return (
    <Link to={"/playlist/$id"} params={{ id }}>
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <img src={imageUrl} alt="" className={styles.image} />
          <button className={styles.play_button} onClick={() => onPlayPlaylist()}>
            <img src={playIcon} className={styles.play_button_image} alt="" />
          </button>
        </div>
        <div className={styles.name_wrapper}>
          <span className={styles.name}>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default PlayListCard;
