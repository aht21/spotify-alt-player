import type { Track } from ".";

export type LibraryContains = boolean[];

export interface LibraryTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: LibraryTrack[];
}

export interface LibraryTrack {
  added_at: string;
  track: Track;
}
