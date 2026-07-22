import type { LibraryContains } from "../../types/library.ts";
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
