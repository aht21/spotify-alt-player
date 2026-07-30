import type { Playlists } from "../../types/playlists.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export function fetchUserPlaylists() {
  return spotifyFetch<Playlists>("/me/playlists");
}

export function fetchPlaylist(id: string) {
  return spotifyFetch(`/playlists/${id}`);
}
