import type { LibraryContains, LikedTracks } from "../../types/library.ts";
import { spotifyFetch } from "./spotifyFetch";

export function fetchLibraryContains(uri: string) {
  return spotifyFetch<LibraryContains>(`/me/library/contains?uris=${uri}`);
}

export function fetchLibrarySave(uri: string) {
  return spotifyFetch(`/me/library?uris=${uri}`, { method: "PUT" });
}

export function fetchLibraryRemove(uri: string) {
  return spotifyFetch(`/me/library?uris=${uri}`, { method: "DELETE" });
}

export function fetchUserLikedTracks(limit: number, offset: number) {
  return spotifyFetch<LikedTracks>(`/me/tracks?limit=${limit}&offset=${offset}`);
}

export function fetchPlayCollection(profileId: string, offset: number = 0) {
  return spotifyFetch("/me/player/play", {
    method: "PUT",
    body: JSON.stringify({
      context_uri: `spotify:user:${profileId}:collection`,
      offset: {
        position: offset,
      },
    }),
  });
}
