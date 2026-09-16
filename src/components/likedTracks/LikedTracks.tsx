import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import type { LibraryTrack } from "../../types/library";
import { fetchPlaybackState } from "../../services/api/player";
import { fetchUserLibraryTracks } from "../../services/api/library";
import LikedTrack from "./likedTrack";
import styles from "./likedTracks.module.css";

const LikedTracks = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data: playbackData } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
  });

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-songs"],
      queryFn: ({ pageParam = 0 }) => fetchUserLibraryTracks(50, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.items.length === 50 ? allPages.length * 50 : undefined,
    });

  const triggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  if (isLoading || isError || !data) return null;

  const items: LibraryTrack[] = data.pages.flatMap((page) => page.items);
  const targetIndex = items.length - 10;

  return (
    <div className={styles.liked_tracks}>
      <div className={styles.legend}>
        <div className={styles.info}>
          <span className={styles.number}>#</span>
          <span className={styles.title}>Title</span>
        </div>
        <span className={styles.album}>Album</span>
        <span className={styles.time_added}>Date added</span>
        <span className={styles.duration}>Time</span>
      </div>

      {items.map((item, index) => (
        <div key={item.track.id} ref={index === targetIndex ? triggerRef : undefined}>
          <LikedTrack
            num={index + 1}
            imageSrc={item.track.album.images[1]?.url}
            name={item.track.name}
            artists={item.track.artists}
            album={item.track.album}
            addedAt={item.added_at}
            durationMs={item.track.duration_ms}
            isActive={playbackData?.item?.id === item.track.id}
          />
        </div>
      ))}
    </div>
  );
};

export default LikedTracks;
