import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import "./index.css";

import { routeTree } from "./routeTree.gen";
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <div>
      {" "}
      <h1> :/ Sorry this page doesn't exist!</h1>
      <Link to="/"> Go Home</Link>
    </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {" "}
    <RouterProvider router={router} />
  </React.StrictMode>
);
