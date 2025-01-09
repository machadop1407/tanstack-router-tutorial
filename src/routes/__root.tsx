import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <Link> Home </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/about"> About </Link>
      </div>
      <Outlet />
      <div>
        <p> Copyright Pedrotech.com</p>
      </div>
    </React.Fragment>
  );
}
