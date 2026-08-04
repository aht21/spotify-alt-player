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

export function fetchPlaybackShuffle(state: boolean) {
  return spotifyFetch(`/me/player/shuffle?state=${state}`, {
    method: "PUT",
  });
}

export function fetchPlaybackRepeat(state: "track" | "context" | "off") {
  return spotifyFetch(`/me/player/repeat?state=${state}`, {
    method: "PUT",
  });
}

export function fetchPlaybackSetVolume(valuePercent: number) {
  return spotifyFetch(`/me/player/volume?volume_percent=${valuePercent}`, { method: "PUT" });
}

export function fetchPlaybackSeek(valueMs: number) {
  return spotifyFetch(`/me/player/seek?position_ms=${Math.round(valueMs)}`, { method: "PUT" });
}
