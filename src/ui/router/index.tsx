import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Route } from "src/ui/router/path";
import RootPage from "src/ui/page/root";
import ErrorPage from "src/ui/page/error";
import AuthPage from "src/ui/page/auth";
import OrderPage from "src/ui/page/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Route.order,
        element: <OrderPage />,
      },
    ],
  },
  {
    path: Route.auth,
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
