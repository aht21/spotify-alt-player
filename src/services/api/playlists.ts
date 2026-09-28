import type { Playlist, PlaylistItems, Playlists } from "../../types/playlists.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export function fetchUserPlaylists() {
  return spotifyFetch<Playlists>("/me/playlists");
}

export function fetchPlaylist(id: string) {
  return spotifyFetch<Playlist>(`/playlists/${id}`);
}

export function fetchPlaylistItems(playlistId: string, limit = 50, offset = 0) {
  return spotifyFetch<PlaylistItems>(
    `/playlists/${playlistId}/items?offset=${offset}&limit=${limit}`,
  );
}
