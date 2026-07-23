import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlaybackNext,
  fetchPlaybackPause,
  fetchPlaybackPrevious,
  fetchPlaybackResume,
} from "../../../services/api/player.ts";
import nextIcon from "../../../assets/icons/next.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import playIcon from "../../../assets/icons/play.svg";
import styles from "./controllers.module.css";
import type { PlaybackState } from "../../../types/player.ts";

interface Props {
  deviceId: string;
  isPlaying: boolean;
}

const Controllers = ({ deviceId, isPlaying }: Props) => {
  const queryClient = useQueryClient();

  const prevMutation = useMutation({
    mutationFn: fetchPlaybackPrevious,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const nextMutation = useMutation({
    mutationFn: fetchPlaybackNext,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  // optimistic pause
  const pauseMutation = useMutation({
    mutationFn: fetchPlaybackPause,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["playback-state"],
      });

      const previous = queryClient.getQueryData<PlaybackState>(["playback-state"]);

      queryClient.setQueryData(["playback-state"], (old: PlaybackState) => ({
        ...old,
        is_playing: false,
      }));

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["playback-state"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  // optimistic resume
  const resumeMutation = useMutation({
    mutationFn: () => fetchPlaybackResume(deviceId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["playback-state"],
      });

      const previous = queryClient.getQueryData<PlaybackState>(["playback-state"]);

      queryClient.setQueryData(["playback-state"], (old: PlaybackState) => ({
        ...old,
        is_playing: true,
      }));

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["playback-state"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const onPlayPause = () => {
    if (isPlaying) {
      pauseMutation.mutate();
    } else {
      resumeMutation.mutate();
    }
  };

  const isMutating =
    prevMutation.isPending ||
    nextMutation.isPending ||
    pauseMutation.isPending ||
    resumeMutation.isPending;

  return (
    <div className={styles.wrapper}>
      <button disabled={isMutating} className={styles.prev} onClick={() => prevMutation.mutate()}>
        <img src={nextIcon} className={styles.prev_icon} alt="" />
      </button>
      <button disabled={isMutating} className={styles.pause} onClick={onPlayPause}>
        {isPlaying ? (
          <img src={pauseIcon} className={styles.pause_icon} alt="pause" />
        ) : (
          <img src={playIcon} className={styles.pause_icon} alt="play" />
        )}
      </button>
      <button disabled={isMutating} className={styles.next} onClick={() => nextMutation.mutate()}>
        <img src={nextIcon} className={styles.next_icon} alt="" />
      </button>
    </div>
  );
};

export default Controllers;
