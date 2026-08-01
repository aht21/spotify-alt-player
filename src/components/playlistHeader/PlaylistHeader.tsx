import { useQuery } from "@tanstack/react-query";
import { fetchPlaylist } from "../../services/api/playlists";
import PlaylistHeaderContent from "../playlistHeaderContent";

interface Props {
  id: string;
}

const PlaylistHeader = ({ id }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => fetchPlaylist(id),
  });

  console.log(data);

  if (isLoading || isError || !data) return;

  return (
    <div>
      <PlaylistHeaderContent
        isPaused={false}
        onPlay={() => console.log(id)}
        coverSrc={data.images[0].url}
        name={data.name}
        contributors={[
          {
            name: data.owner.display_name,
            url: data.owner.external_urls.spotify,
          },
        ]}
      />
    </div>
  );
};

export default PlaylistHeader;
