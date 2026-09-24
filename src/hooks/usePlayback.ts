import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlaybackNext,
  fetchPlaybackPause,
  fetchPlaybackPrevious,
  fetchPlaybackRepeat,
  fetchPlaybackResume,
  fetchPlaybackShuffle,
  fetchPlaybackState,
} from "../services/api/player";
import { useOptimisticPlaybackMutation } from "./useOptimisticPlaybackMutation";

type RepeatState = "track" | "context" | "off";

const NEXT_REPEAT_STATE: Record<RepeatState, RepeatState> = {
  off: "context",
  context: "track",
  track: "off",
};

const usePlayback = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["playback-state"] });

  const { data, isLoading } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
    refetchInterval: 5000,
  });

  const prevMutation = useMutation({
    mutationFn: fetchPlaybackPrevious,
    onSuccess: invalidate,
  });

  const nextMutation = useMutation({
    mutationFn: fetchPlaybackNext,
    onSuccess: invalidate,
  });

  const pauseMutation = useOptimisticPlaybackMutation(fetchPlaybackPause, () => ({
    is_playing: false,
  }));

  const resumeMutation = useOptimisticPlaybackMutation(
    () => fetchPlaybackResume(),
    () => ({ is_playing: true }),
  );

  const shuffleState = data?.shuffle_state ?? false;
  const repeatState = (data?.repeat_state ?? "off") as RepeatState;
  const isPlaying = data?.is_playing;

  const shuffleMutation = useOptimisticPlaybackMutation(
    () => fetchPlaybackShuffle(!shuffleState),
    () => ({ shuffle_state: !shuffleState }),
  );

  const repeatMutation = useOptimisticPlaybackMutation(
    () => fetchPlaybackRepeat(NEXT_REPEAT_STATE[repeatState]),
    () => ({ repeat_state: NEXT_REPEAT_STATE[repeatState] }),
  );

  return {
    data,
    isLoading,
    pause: () => pauseMutation.mutate(),
    resume: () => resumeMutation.mutate(),
    prev: () => prevMutation.mutate(),
    next: () => nextMutation.mutate(),
    shuffle: () => shuffleMutation.mutate(),
    repeat: () => repeatMutation.mutate(),
    isPlaying,
    repeatState,
    shuffleState,
  };
};

export default usePlayback;
