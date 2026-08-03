import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../services/api/user";
import { fetchPlayCollection } from "../../../services/api/library";
import playIcon from "../../../assets/icons/play.svg";
import likedCover from "../../../assets/images/liked_songs.png";
import styles from "./savedTracksCard.module.css";

const SavedTracksCard = () => {
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

  const onPlayLibrary = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!data) return;
    playMutation.mutate(data.id);
  };

  return (
    <Link to="/liked">
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <img src={likedCover} className={styles.image} />
          <button className={styles.play_button} onClick={onPlayLibrary}>
            <img src={playIcon} className={styles.play_button_image} alt="" />
          </button>
        </div>
        <div className={styles.name_wrapper}>
          <span className={styles.name}>Saved tracks</span>
        </div>
      </div>
    </Link>
  );
};

export default SavedTracksCard;
