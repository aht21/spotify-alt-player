import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPlayPlaylist } from "../../../services/api/playlists";
import { fetchPlaybackPause, fetchPlaybackResume } from "../../../services/api/player";
import playIcon from "../../../assets/icons/play.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import styles from "./playlistCard.module.css";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
  isActive: boolean;
  isPlaying: boolean;
  deviceId: string | undefined;
}

const PlayListCard = ({ id, imageUrl, name, isActive, isPlaying, deviceId }: Props) => {
  const queryClient = useQueryClient();

  const playMutation = useMutation({
    mutationFn: (id: string) => fetchPlayPlaylist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const pauseMutation = useMutation({
    mutationFn: fetchPlaybackPause,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const resumeMutation = useMutation({
    mutationFn: () => fetchPlaybackResume(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const onPlayPauseLibrary = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isPlaying && isActive) pauseMutation.mutate();
    else if (isActive && deviceId) resumeMutation.mutate();
    else playMutation.mutate(id);
  };

  return (
    <Link to={"/playlist/$id"} params={{ id }}>
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
