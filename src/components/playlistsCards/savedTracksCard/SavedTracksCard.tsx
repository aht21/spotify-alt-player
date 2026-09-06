import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../services/api/user";
import { fetchPlayCollection } from "../../../services/api/library";
import { fetchPlaybackPause, fetchPlaybackResume } from "../../../services/api/player";
import playIcon from "../../../assets/icons/play.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import likedCover from "../../../assets/images/liked_songs.png";
import styles from "./savedTracksCard.module.css";

interface Props {
  isActive: boolean;
  isPlaying: boolean;
  deviceId: string | undefined;
}

const SavedTracksCard = ({ isActive, isPlaying, deviceId }: Props) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  const playMutation = useMutation({
    mutationFn: (id: string) => fetchPlayCollection(id),
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
    mutationFn: (deviceId: string) => fetchPlaybackResume(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const onPlayPauseLibrary = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!data) return;

    if (isPlaying) pauseMutation.mutate();
    else if (isActive && deviceId) resumeMutation.mutate(deviceId);
    else playMutation.mutate(data.id);
  };

  return (
    <Link to="/liked">
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
