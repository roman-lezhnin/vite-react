import React from "react";
import { configure } from "mobx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import type { Metric } from "web-vitals";
import { CompositionRoot } from "src/core/di/composition-root";
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
    if (import.meta.env.DEV) {
      import("./data/api/mocks").then(({ mockServer }) => {
        mockServer.start();
      });
    }
  }

  private static render(): void {
    const root = createRoot(document.getElementById("root") as HTMLElement);
    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
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

  public static main(): void {
    WebApplication.prepare();
    CompositionRoot.configure();
    WebApplication.render();
    WebApplication.reportWebVitals();
  }
}
