import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = params.id;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!response.ok) throw Error();

    const data = await response.json();
    return { data };
  },
  pendingComponent: () => <div> Loading...</div>,
  errorComponent: () => <div> There was an error!</div>,
});

function RouteComponent() {
  const { data } = useLoaderData({ from: "/posts/$id" });
  return (
    <div>
      <h1> {data.title}</h1>
      <p> {data.body}</p>
    </div>
  );
}
