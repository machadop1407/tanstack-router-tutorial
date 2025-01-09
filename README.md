---
title: "Getting Started with TanStack Router: A Step-by-Step Tutorial"
slug: getting-started-with-tanstack-router
description: "A comprehensive guide to setting up and using TanStack Router in React applications, covering file-based routing, code-based configuration, and more."
date: 2024-12-25
image: tanstack-router-tutorial.webp
---

## Getting Started with TanStack Router: A Step-by-Step Tutorial

Welcome to this comprehensive guide on **TanStack Router**, a powerful and flexible routing library for React applications. Whether you're a beginner looking to understand the basics or an experienced developer aiming to enhance your routing strategy, this tutorial will walk you through setting up TanStack Router using both file-based and code-based configurations. We'll cover project scaffolding, manual setup, creating routes, lazy loading, integrating with Vite, and much more. By the end of this tutorial, you'll have a solid foundation to implement TanStack Router in your React projects effectively.

_(Prefer watching? Check out my [YouTube channel Pedrotechnologies](https://www.youtube.com/@pedrotechnologies) for video tutorials and demonstrations!)_

---

## Table of Contents

1. [Introduction to TanStack Router](#introduction-to-tanstack-router)
2. [Installation](#installation)
   - [Scaffolding Your First TanStack Router Project](#scaffolding-your-first-tanstack-router-project)
   - [Manual Setup and Vite Configuration](#manual-setup-and-vite-configuration)
3. [Routing](#routing)
   - [File-Based Route Generation](#file-based-route-generation)
   - [Code-Based Route Configuration](#code-based-route-configuration)
4. [Creating Routes](#creating-routes)
   - [Root Route](#root-route)
   - [Child Routes](#child-routes)
   - [Lazy-Loaded Child Routes](#lazy-loaded-child-routes)
5. [Integrating Routes in `main.tsx`](#integrating-routes-in-maintsx)
6. [Running the Application](#running-the-application)
7. [Comparison with Other Routers](#comparison-with-other-routers)
8. [Conclusion](#conclusion)

---

## 1. Introduction to TanStack Router

**TanStack Router** is a modern routing library for React, developed by the creators of TanStack Query (formerly React Query). It offers a flexible, type-safe, and developer-friendly experience, integrating seamlessly with tools like Vite. TanStack Router supports both file-based routing, similar to Next.js, and code-based route configuration, providing versatility based on your project needs. With built-in dev tools, search parameter handling, and lazy loading capabilities, TanStack Router aims to enhance your React application's navigation and performance.

### Why Choose TanStack Router?

- **Type Safety:** Strong TypeScript integration ensures type-safe routes, reducing runtime errors.
- **Flexibility:** Supports both file-based and code-based routing configurations.
- **Performance:** Lazy loading and efficient bundle management optimize application performance.
- **Developer Experience:** Built-in dev tools and seamless integration with Vite enhance the development workflow.
- **Scalability:** Suitable for projects of all sizes, from small applications to large-scale projects.

---

## 2. Installation

Setting up TanStack Router correctly is crucial for a smooth development experience. You can start by scaffolding a new project using the provided create command or integrate it manually into an existing React project.

### Scaffolding Your First TanStack Router Project

The recommended way to start with TanStack Router is by using the scaffolding command, which sets up everything you need with minimal effort.

#### Steps to Scaffold a New Project

1. **Run the Create Command:**

   ```bash
   npm create @tanstack/router@latest
   # or
   pnpm create @tanstack/router
   # or
   yarn create @tanstack/router
   # or
   bun create @tanstack/router
   # or
   deno init --npm @tanstack/router
   ```

2. **Follow the Prompts:**

   After running the command, follow the interactive prompts to set up your project. This process initializes a new React project configured with TanStack Router and Vite.

3. **Navigate to the Project Directory:**

   ```bash
   cd your-project-name
   ```

4. **Install Dependencies:**

   If not already done by the create command, install the necessary dependencies:

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   # or
   bun install
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173` (or the address provided) to see your running application.

### Manual Setup and Vite Configuration

If you prefer integrating TanStack Router into an existing Vite + React project, follow these steps:

#### 1. Install the Vite Plugin and Router Devtools

Run the following command to install the necessary packages:

```bash
npm install -D @tanstack/router-plugin @tanstack/router-devtools
# or
pnpm add -D @tanstack/router-plugin @tanstack/router-devtools
# or
yarn add -D @tanstack/router-plugin @tanstack/router-devtools
# or
bun add -D @tanstack/router-plugin @tanstack/router-devtools
# or
deno add npm:@tanstack/router-plugin npm:@tanstack/router-devtools
```

#### 2. Configure the Vite Plugin

Modify your `vite.config.ts` to include the TanStack Router plugin:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    // ...other plugins
  ],
});
```

**Tip:** If you're not using Vite or any supported bundler, refer to the [File-Based Routing guide](https://tanstack.com/router/docs/file-based-routing) for more information.

---

## 3. Routing

Routing is essential for navigating between different views or pages in your React application. TanStack Router offers two primary methods for defining routes: file-based route generation and code-based route configuration.

### File-Based Route Generation

File-based route generation is the recommended approach as it provides the best developer experience with minimal configuration. Routes are automatically generated based on the file structure within the `src/routes` directory.

#### Directory Structure

Create the following files in your project:

```
src/
  routes/
    __root.tsx
    index.lazy.tsx
    about.lazy.tsx
  main.tsx
```

Each route file should export an object named `Route`, created using `createRootRoute` or `createLazyFileRoute`.

**Note:** Files with the `.lazy.tsx` extension are lazy-loaded, which helps keep the main bundle size small and improves performance.

### Code-Based Route Configuration

For projects that require more dynamic or complex routing setups, TanStack Router supports code-based route configuration. This method allows you to define routes programmatically within your code.

**Important:** While code-based routing offers greater flexibility, it's recommended to split routes into separate files for better organization as your application grows.

---

## 4. Creating Routes

Creating routes involves defining the structure and behavior of each route in your application. We'll start by setting up the root route and then add child routes.

### Root Route

The root route defines the top-level layout and navigation for your application. It typically includes shared UI elements like a navigation bar and an `<Outlet />` where child routes will be rendered.

#### `src/routes/__root.tsx`

```tsx
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

**Explanation:**

- **`createRootRoute`:** Creates the root route for your application.
- **`Link`:** Used for navigation between routes. The `.active` class is applied when the route is active, allowing for styling.
- **`Outlet`:** A placeholder where child routes will be rendered.
- **`TanStackRouterDevtools`:** Adds a debug panel for inspecting routes and navigation states.

### Child Routes

Child routes represent individual pages or views within your application. They are defined in separate files and linked to the root route.

#### `src/routes/index.lazy.tsx`

```tsx
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
```

#### `src/routes/about.lazy.tsx`

```tsx
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}
```

**Explanation:**

- **`createLazyFileRoute`:** Defines a lazy-loaded route, automatically handling code splitting for optimal performance.
- **`component`:** The React component to render when the route is active.

---

## 5. Integrating Routes in `main.tsx`

Once your routes are defined, you need to integrate them into your React application. This involves importing the generated route tree and creating a router instance.

#### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
```

**Explanation:**

- **`createRouter`:** Initializes a new router instance with the provided route tree.
- **`RouterProvider`:** Provides the router instance to your React application.
- **Type Safety Registration:** Ensures that the router instance is registered for type safety within the TanStack Router context.
- **Rendering the App:** Mounts the React application to the DOM element with the ID `root`.

**Note:** Ensure that your `index.html` file contains a `<div id='root'></div>` element to serve as the mounting point for the React application.

---

## 6. Running the Application

With everything set up, you can now run your application to see TanStack Router in action.

#### Start the Development Server

```bash
npm run dev
# or
pnpm run dev
# or
yarn dev
# or
bun run dev
```

Open your browser and navigate to `http://localhost:5173` (or the address provided by Vite). You should see the navigation bar with "Home" and "About" links. Clicking on these links will navigate between the Home and About pages without a full page reload.

**Developer Tools:**

- **React DevTools:** Inspect the React component hierarchy.
- **TanStack Router Devtools:** Access detailed information about the current route, parameters, and navigation states.

---

## 7. Code-Based Route Configuration

In addition to file-based routing, TanStack Router allows you to define routes programmatically. This approach provides more control and flexibility, especially for dynamic routing scenarios.

### Example of Code-Based Route Configuration

Here's how you can configure routes using code within a single file. For larger projects, it's recommended to split routes into separate files for better organization.

#### Single File Route Configuration

```tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Define the root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Define the Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

// Define the About route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router instance
const router = createRouter({ routeTree });

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
```

**Explanation:**

- **`createRoute`:** Defines individual routes programmatically.
- **`getParentRoute`:** Specifies the parent route, establishing the route hierarchy.
- **`path`:** The URL path segment for the route.
- **`component`:** The React component to render for the route.
- **`addChildren`:** Adds child routes to the root route.
- **Router Registration:** Ensures type safety by registering the router instance.

**Note:** Even though this example uses a single file for simplicity, it's advisable to organize routes into separate files for better maintainability in larger projects.

---

## 8. Comparison with Other Routers

Before committing to a new routing solution, it's essential to understand how TanStack Router compares to other popular libraries like React Router and Next.js Routing. Below is a comparison based on various features and capabilities:

| Feature/Capability                                 | TanStack Router / Start                               | React Router DOM (Website) | Next.JS (Website) |
| -------------------------------------------------- | ----------------------------------------------------- | -------------------------- | ----------------- |
| **History, Memory & Hash Routers**                 | ✅                                                    | ✅                         | 🛑                |
| **Nested / Layout Routes**                         | ✅                                                    | ✅                         | 🟡                |
| **Suspense-like Route Transitions**                | ✅                                                    | ✅                         | ✅                |
| **Typesafe Routes**                                | ✅                                                    | 🟡 (1/5)                   | 🟡                |
| **Code-based Routes**                              | ✅                                                    | ✅                         | 🛑                |
| **File-based Routes**                              | ✅                                                    | ✅                         | ✅                |
| **Virtual/Programmatic File-based Routes**         | ✅                                                    | ✅                         | 🛑                |
| **Router Loaders**                                 | ✅                                                    | ✅                         | ✅                |
| **SWR Loader Caching**                             | ✅                                                    | 🛑                         | ✅                |
| **Route Prefetching**                              | ✅                                                    | ✅                         | ✅                |
| **Auto Route Prefetching**                         | ✅                                                    | ✅                         | ✅                |
| **Route Prefetching Delay**                        | ✅                                                    | 🔶                         | 🛑                |
| **Path Params**                                    | ✅                                                    | ✅                         | ✅                |
| **Typesafe Path Params**                           | ✅                                                    | ✅                         | 🛑                |
| **Typesafe Route Context**                         | ✅                                                    | 🛑                         | 🛑                |
| **Path Param Validation**                          | ✅                                                    | 🛑                         | 🛑                |
| **Custom Path Param Parsing/Serialization**        | ✅                                                    | 🛑                         | 🛑                |
| **Ranked Routes**                                  | ✅                                                    | ✅                         | ✅                |
| **Active Link Customization**                      | ✅                                                    | ✅                         | ✅                |
| **Optimistic UI**                                  | ✅                                                    | ✅                         | 🔶                |
| **Typesafe Absolute + Relative Navigation**        | ✅                                                    | 🛑                         | 🛑                |
| **Route Mount/Transition/Unmount Events**          | ✅                                                    | 🛑                         | 🛑                |
| **Devtools**                                       | ✅                                                    | 🛑                         | 🛑                |
| **Basic Search Params**                            | ✅                                                    | ✅                         | ✅                |
| **Search Param Hooks**                             | ✅                                                    | ✅                         | ✅                |
| **<Link/>/useNavigate Search Param API**           | ✅                                                    | 🟡                         | 🟡                |
| **JSON Search Params**                             | ✅                                                    | 🔶                         | 🔶                |
| **TypeSafe Search Params**                         | ✅                                                    | 🛑                         | 🛑                |
| **Search Param Schema Validation**                 | ✅                                                    | 🛑                         | 🛑                |
| **Search Param Immutability + Structural Sharing** | ✅                                                    | 🔶                         | 🛑                |
| **Custom Search Param parsing/serialization**      | ✅                                                    | 🔶                         | 🛑                |
| **Search Param Middleware**                        | ✅                                                    | 🛑                         | 🛑                |
| **Suspense Route Elements**                        | ✅                                                    | ✅                         | ✅                |
| **Route Error Elements**                           | ✅                                                    | ✅                         | ✅                |
| **Route Pending Elements**                         | ✅                                                    | ✅                         | ✅                |
| **<Block>/useBlocker**                             | ✅                                                    | 🔶                         | ❓                |
| **SSR**                                            | ✅                                                    | ✅                         | ✅                |
| **Streaming SSR**                                  | ✅                                                    | ✅                         | ✅                |
| **Deferred Primitives**                            | ✅                                                    | ✅                         | ✅                |
| **Navigation Scroll Restoration**                  | ✅                                                    | ✅                         | ❓                |
| **Loader Caching (SWR + Invalidation)**            | 🔶 (TanStack Query is recommended)                    | 🛑                         | ✅                |
| **Router Invalidation**                            | ✅                                                    | ✅                         | ✅                |
| **"Actions"**                                      | 🔶 (TanStack Query, or router.invalidate recommended) | ✅                         | ✅                |
| **<Form> API**                                     | 🛑                                                    | ✅                         | ✅                |
| **Runtime Route Manipulation (Fog of War)**        | 🛑                                                    | ✅                         | ✅                |
| **Full-Stack APIs**                                | 🛑                                                    | ✅                         | ✅                |

**Key:**

- ✅ 1st-class, built-in, and ready to use with no added configuration or code
- 🔵 Supported via addon package
- 🟡 Partial Support (on a scale of 5)
- 🔶 Possible, but requires custom code/implementation/casting
- 🛑 Not officially supported
- ❓ Unknown or not applicable

**Summary:**

TanStack Router offers a robust set of features with strong TypeScript integration, built-in devtools, and flexible routing options. It excels in type safety, loader caching, and developer tools, making it a compelling choice compared to other routers like React Router and Next.js. However, some advanced features may require additional configuration or custom implementation.

---

## 9. Conclusion

In this tutorial, we've explored **TanStack Router**, a versatile and type-safe routing library for React applications. We've covered how to scaffold a new project, perform manual setup with Vite, create root and child routes, implement lazy loading, and integrate everything into your main application file. Additionally, we've compared TanStack Router with other popular routing solutions to highlight its strengths and unique features.

### Key Takeaways:

- **Flexible Routing Options:** Choose between file-based and code-based routing configurations based on your project's needs.
- **Type Safety:** Strong TypeScript support ensures reliable and error-free navigation.
- **Performance Optimization:** Lazy loading and efficient bundle management enhance application performance.
- **Developer Experience:** Built-in devtools and seamless integration with Vite streamline the development workflow.
- **Scalability:** Suitable for projects of all sizes, promoting maintainable and scalable codebases.

By adopting TanStack Router, you can enhance your React application's navigation, performance, and developer experience. Whether you're building a small project or a large-scale application, TanStack Router provides the tools and flexibility needed to manage routes effectively.

For more tutorials, examples, and in-depth guides, be sure to subscribe and check out my [YouTube channel Pedrotechnologies](https://www.youtube.com/@pedrotechnologies).

---
