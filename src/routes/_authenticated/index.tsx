import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "../../components/header";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Header />
      <Link to="/preview">Preview</Link>
    </div>
  );
}
