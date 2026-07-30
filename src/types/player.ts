import type { Track } from ".";

export interface PlaybackState {
  device: PlaybackDevice;
  repeat_state: "off" | "track" | "context";
  shuffle_state: boolean;
  context: PlaybackContext | null;
  timestamp: number;
  progress_ms: number | null;
  is_playing: boolean;
  item: Track | null;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  actions: PlaybackActions;
}

interface PlaybackDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
  supports_volume: boolean;
}

interface PlaybackContext {
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}

interface PlaybackActions {
  disallows?: {
    interrupting_playback?: boolean;
    pausing?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
    toggling_repeat_context?: boolean;
    toggling_shuffle?: boolean;
    toggling_repeat_track?: boolean;
    transferring_playback?: boolean;
  };
}
