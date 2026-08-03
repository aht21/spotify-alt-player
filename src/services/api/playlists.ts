import type { Playlist, PlaylistItems, Playlists } from "../../types/playlists.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export function fetchPlayPlaylist(playlistId: string) {
  return spotifyFetch("/me/player/play", {
    method: "PUT",
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlistId}`,
    }),
  });
}

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
