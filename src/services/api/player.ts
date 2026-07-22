import type { PlaybackState } from "../../types/player";
import { spotifyFetch } from "./spotifyFetch";

export function fetchPlaybackState() {
  return spotifyFetch<PlaybackState>("/me/player");
}
