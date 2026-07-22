import { createLazyFileRoute } from "@tanstack/react-router";
import { login } from "../services/auth";

export const Route = createLazyFileRoute("/preview")({
  component: Preview,
});

function Preview() {
  return <button onClick={login}>Login with Spotify</button>;
}
