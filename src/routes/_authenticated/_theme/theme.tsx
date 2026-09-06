import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_theme/theme")({
  component: Theme,
});

function Theme() {
  return <div>Hello "/_authenticated/_theme/theme"!</div>;
}
