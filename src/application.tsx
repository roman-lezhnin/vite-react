import React from "react";
import { configure } from "mobx";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import type { Metric } from "web-vitals";
import { router } from "src/ui/router";

export class WebApplication {
  private static prepare(): void {
    configure({
      enforceActions: "always",
      computedRequiresReaction: true,
      reactionRequiresObservable: true,
      observableRequiresReaction: true,
      disableErrorBoundaries: true,
    });
  }

  private static render(): void {
    const root = createRoot(document.getElementById("root") as HTMLElement);
    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
      </React.StrictMode>,
    );
  }

  private static reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import("web-vitals").then(({ onCLS, onINP, onLCP }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onLCP(onPerfEntry);
      });
    }
  };

  public static async main(): Promise<void> {
    if (import.meta.env.DEV) {
      const { mockServer } = await import("./data/api/mocks");
      await mockServer.start();
    }
    WebApplication.prepare();
    WebApplication.render();
    WebApplication.reportWebVitals();
  }
}
