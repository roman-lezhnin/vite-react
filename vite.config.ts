import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { port: 8080, cors: true },
  resolve: { alias: { src: "/src" } },
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "2023-05" }],
        ],
      },
    }),
  ],
});
