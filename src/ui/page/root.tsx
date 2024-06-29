import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Route } from "src/ui/router/path";

export default function RootPage(): JSX.Element {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to={Route.order}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "inherit",
                  };
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? "active" : isPending ? "pending" : "";
                }}
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
