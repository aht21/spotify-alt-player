import type { PlaybackState } from "../../types/player";
import { spotifyFetch } from "./spotifyFetch";

export function fetchPlaybackState() {
  return spotifyFetch<PlaybackState>("/me/player");
}

export function fetchPlaybackPrevious() {
  return spotifyFetch("/me/player/previous", { method: "POST" });
}

export function fetchPlaybackNext() {
  return spotifyFetch("/me/player/next", { method: "POST" });
}

export function fetchPlaybackResume(deviceId: string) {
  return spotifyFetch(`/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
  });
}

export function fetchPlaybackPause() {
  return spotifyFetch("/me/player/pause", { method: "PUT" });
}

export function fetchPlaybackSetVolume(value: number) {
  return spotifyFetch(`/me/player/volume?volume_percent=${value}`, { method: "PUT" });
}
