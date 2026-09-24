import { createContext, useContext, type ReactNode } from "react";
import usePlayback from "../../hooks/usePlayback";

type PlaybackContextValue = ReturnType<typeof usePlayback>;

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const playback = usePlayback();
  return <PlaybackContext.Provider value={playback}>{children}</PlaybackContext.Provider>;
};

export const usePlaybackContext = () => {
  const ctx = useContext(PlaybackContext);
  if (!ctx) {
    throw new Error("usePlaybackContext must be used within PlaybackProvider");
  }
  return ctx;
};

export default PlaybackProvider;
