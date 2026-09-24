import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../services/api/user";
import { fetchPlayCollection } from "../../services/api/library";
import { fetchPlaybackState } from "../../services/api/player";
import PlaylistHeaderContent from "../playlistHeaderContent";
import likedSongsCover from "../../assets/images/liked_songs.png";

const LIKED_SONGS_URI = "spotify:playlist:37i9dQZF1F5p3rmiWPIYgZ";

const LikedHeader = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  const { data: playbackData } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
    refetchInterval: 5000,
  });

  if (isLoading || isError || !data) return null;

  const isPaused = playbackData?.context?.uri === LIKED_SONGS_URI && !playbackData?.is_playing;
  console.log(isPaused, "pause");

  return (
    <PlaylistHeaderContent
      isPaused={isPaused}
      onPlay={() => fetchPlayCollection(data.id, 0)}
      coverSrc={likedSongsCover}
      name="Liked songs"
      contributors={[
        {
          name: data.display_name,
          url: data.external_urls.spotify,
        },
      ]}
      url="https://open.spotify.com/collection/tracks"
    />
  );
};

export default LikedHeader;
