import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLibraryTracks } from "../../../services/api/library";
import LikedHeader from "../../../components/likedHeader";
import LikedTracks from "../../../components/likedTracks";
import styles from "./liked.module.css";

export const Route = createFileRoute("/_authenticated/_liked/liked")({
  component: Liked,
});

function Liked() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-songs"],
    queryFn: () => fetchUserLibraryTracks(50, 0),
  });

  if (isLoading || isError || !data) return;

  return (
    <div className={styles.saved}>
      <div className={styles.inner}>
        <LikedHeader />
        <LikedTracks items={data.items} />
      </div>
    </div>
  );
}
