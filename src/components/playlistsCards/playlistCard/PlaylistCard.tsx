import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPlayPlaylist } from "../../../services/api/playlists";
import playIcon from "../../../assets/icons/play.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import styles from "./playlistCard.module.css";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
  isActive: boolean;
}

const PlayListCard = ({ id, imageUrl, name, isActive }: Props) => {
  const queryClient = useQueryClient();

  const playMutation = useMutation({
    mutationFn: (id: string) => fetchPlayPlaylist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const onPlayPlaylist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    playMutation.mutate(id);
  };

  return (
    <Link to={"/playlist/$id"} params={{ id }}>
      <div className={styles.card}>
        <div className={`${styles.image_wrapper} ${isActive && styles.active_image}`}>
          <img src={imageUrl} alt="" className={styles.image} />
          <button
            className={`${styles.play_button} ${isActive && styles.active_button}`}
            onClick={onPlayPlaylist}
          >
            <img
              src={isActive ? pauseIcon : playIcon}
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
