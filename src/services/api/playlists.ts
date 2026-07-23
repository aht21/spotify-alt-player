import type { Playlists } from "../../types/playlists.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export function fetchUserPlaylists() {
  return spotifyFetch<Playlists>("/me/playlists");
}
