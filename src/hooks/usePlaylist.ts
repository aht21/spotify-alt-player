import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPlaylist, fetchPlayPlaylist } from "../services/api/playlists";

const usePlaylist = (id: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => fetchPlaylist(id),
  });

  const playMutation = useMutation({
    mutationFn: (id: string) => fetchPlayPlaylist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    play: () => playMutation.mutate(id),
  };
};

export default usePlaylist;
