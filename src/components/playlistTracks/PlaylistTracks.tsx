import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { fetchPlaylistItems } from "../../services/api/playlists";
import usePlayback from "../../hooks/usePlayback";
import PlaylistTrack from "./playlistTrack";
import styles from "./playlistTracks.module.css";
import type { PlaylistTrack as PlaylistTrackType } from "../../types/library";

interface Props {
  id: string;
  uri: string;
}

const PlaylistTracks = ({ id, uri }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["playlist-songs", id],
    queryFn: ({ pageParam = 0 }) => fetchPlaylistItems(id, 50, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.items.length === 50 ? allPages.length * 50 : undefined,
  });

  const { data: playbackData } = usePlayback();

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

  if (isLoading) return null;

  if (!data) {
    return (
      <div className={styles.no_data}>
        <span>
          Sorry, Spotify doesn't expose track lists for other users' playlists through the API(
        </span>
      </div>
    );
  }

  const items: PlaylistTrackType[] = data.pages.flatMap((page) => page.items);
  const targetIndex = items.length - 10;
  let inactiveTracks = 0;

  return (
    <div className={styles.playlist_tracks}>
      <div className={styles.legend}>
        <div className={styles.info}>
          <span className={styles.number}>#</span>
          <span className={styles.title}>Title</span>
        </div>
        <span className={styles.album}>Album</span>
        <span className={styles.time_added}>Date added</span>
        <span className={styles.duration}>Time</span>
      </div>

      {items.map((item, index) => {
        if (item.item.is_playable === false) inactiveTracks++;

        return (
          <div key={item.item.id} ref={index === targetIndex ? triggerRef : undefined}>
            <PlaylistTrack
              num={index + 1 - inactiveTracks}
              uri={uri}
              imageSrc={item.item.album.images[1]?.url}
              name={item.item.name}
              artists={item.item.artists}
              album={item.item.album}
              addedAt={item.added_at}
              durationMs={item.item.duration_ms}
              isPlayable={item.item.is_playable}
              isActive={playbackData?.item?.id === item.item.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistTracks;
