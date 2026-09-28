import type { Track } from ".";

export type LibraryContains = boolean[];

export interface LibraryTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: PlaylistTrack[];
}

export interface PlaylistTrack {
  added_at: string;
  item: Track;
}
