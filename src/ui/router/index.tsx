import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Route } from "src/ui/router/path";
import AuthPage from "src/ui/page/auth";
import DashboardPage from "src/ui/page/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={Route.auth} />,
  },
  {
    path: Route.auth,
    element: <AuthPage />,
  },
  {
    path: Route.dashboard,
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
