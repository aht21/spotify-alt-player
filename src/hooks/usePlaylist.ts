import { useQuery } from "@tanstack/react-query";
import type { Playlist } from "../types/playlists";
import { fetchPlaylist } from "../services/api/playlists";

const usePlaylist = <T = Playlist>(id: string, select?: (data: Playlist) => T) => {
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () => fetchPlaylist(id),
    select,
  });
};

export default usePlaylist;
