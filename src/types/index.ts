export interface Track {
  id: string;
  uri: string;
  href: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  is_local: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  disc_number: number;

  artists: Artist[];
  album: Album;

  available_markets: string[];
  external_ids: {
    isrc: string;
    ean?: string;
    upc?: string;
  };

  external_urls: {
    spotify: string;
  };
}

export interface Album {
  id: string;
  name: string;
  href: string;
  uri: string;

  album_type: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: string;

  images: Image[];

  artists: Artist[];

  external_urls: {
    spotify: string;
  };
}

export interface Artist {
  id: string;
  name: string;
  href: string;
  uri: string;

  external_urls: {
    spotify: string;
  };
}

export interface Image {
  url: string;
  width: number | null;
  height: number | null;
}
