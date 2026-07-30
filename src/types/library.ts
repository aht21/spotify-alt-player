import type { Track } from ".";

export type LibraryContains = boolean[];

export interface LikedTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: LikedTrack[];
}

export interface LikedTrack {
  added_at: string;
  track: Track;
}
