import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Gallery from "./components/Gallery.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/grids/",
    element: <Gallery />,
    loader: async ({ request }) => {
      const { search } = new URL(request.url);
      const response = await fetch(`/api/grids/${search}`);
      if (!response.ok) throw new Error("Not Found");
      return response.json();
    },
  },
  {
    path: "/grids/:id",
    element: <App />,
    loader: async ({ params }) => {
      const response = await fetch(`/api/grids/${params.id}/`);
      if (!response.ok) throw new Error("Not Found");
      return response.json();
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
