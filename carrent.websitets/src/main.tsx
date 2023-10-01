import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cars from "./pages/Cars.tsx";
import Layout from "./components/Layout/Layout.tsx";
import CarDetails from "./pages/CarDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "cars/:carid",
        element: <CarDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
