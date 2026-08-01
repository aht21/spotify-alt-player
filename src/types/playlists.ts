import type { Image } from "./.";

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface User {
  external_urls: TracksReference;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}

export interface TracksReference {
  href: string;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks: TracksReference;
  type: "playlist";
  uri: string;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist[];
}
