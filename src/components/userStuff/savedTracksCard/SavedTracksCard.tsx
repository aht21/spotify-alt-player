import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../services/api/user";
import { fetchPlayCollection } from "../../../services/api/library";
import { Link } from "@tanstack/react-router";
import playIcon from "../../../assets/icons/play.svg";
import styles from "./savedTracksCard.module.css";

const SavedTracksCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return;
  if (isError || !data) return;

  const onPlayLibrary = () => {
    fetchPlayCollection(data.id);
  };

  return (
    <Link to="/liked">
      <div className={styles.card}>
        <div className={styles.image}>
          <button className={styles.play_button} onClick={onPlayLibrary}>
            <img src={playIcon} className={styles.play_button_image} alt="" />
          </button>
        </div>
        <span className={styles.name}>Saved tracks</span>
      </div>
    </Link>
  );
};

export default SavedTracksCard;
