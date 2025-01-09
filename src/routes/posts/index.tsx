import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/posts/$id" params={{ id: "3" }}>
        {" "}
        Post 3
      </Link>
    </div>
  );
}
