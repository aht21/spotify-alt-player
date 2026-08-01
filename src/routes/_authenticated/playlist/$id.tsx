import { createFileRoute } from "@tanstack/react-router";
import PlaylistHeader from "../../../components/playlistHeader";

export const Route = createFileRoute("/_authenticated/playlist/$id")({
  component: Playlist,
});

function Playlist() {
  const { id } = Route.useParams();
  return <PlaylistHeader id={id} />;
}
