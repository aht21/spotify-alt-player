import { useQuery } from "@tanstack/react-query";
import { fetchPlaybackState } from "../services/api/player";
import type { PlaybackState } from "../types/player";

const usePlayback = <T = PlaybackState>(select?: (data: PlaybackState) => T) => {
  return useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
    refetchInterval: 5000,
    staleTime: 4000,
    select,
  });
};

export default usePlayback;
