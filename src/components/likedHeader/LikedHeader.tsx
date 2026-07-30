import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../services/api/user";
import PlaylistHeaderContent from "../playlistHeaderContent";
import likedSongsCover from "../../assets/images/liked_songs.png";

const LikedHeader = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading || isError || !data) return;

  return (
    <PlaylistHeaderContent
      coverSrc={likedSongsCover}
      name="Liked songs"
      contributors={[
        {
          name: data?.display_name,
          url: data.external_urls.spotify,
          imageSrc: data.images[1].url,
        },
      ]}
    />
  );
};

export default LikedHeader;
