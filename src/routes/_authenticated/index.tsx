import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
    component: Index,
})

function Index () {
    return (
    <div>
        <h1>Index</h1>
        <Link to="/preview">Preview</Link>
    </div>
)
}