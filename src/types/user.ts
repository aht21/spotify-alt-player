export interface UserProfile {
  account_id: string;
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  product: "free" | "premium" | "open";
  type: "user";
  uri: string;
}

export interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}
