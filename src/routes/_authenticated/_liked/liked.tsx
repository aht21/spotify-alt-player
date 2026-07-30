import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLikedTracks } from "../../../services/api/library";
import LikedHeader from "../../../components/likedHeader";
import LikedTracksList from "../../../components/likedTracksList";
import styles from "./liked.module.css";

export const Route = createFileRoute("/_authenticated/_liked/liked")({
  component: LikedTracks,
});

function LikedTracks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-songs"],
    queryFn: () => fetchUserLikedTracks(30, 0),
  });

  if (isLoading || isError || !data) return;

  return (
    <div className={styles.saved}>
      <div className={styles.inner}>
        <LikedHeader />
        <LikedTracksList items={data.items} />
      </div>
    </div>
  );
}
