import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.js",
    css: false,
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text"],
      inckude: ["./src/**/*.jsx"],
      all: true,
      exclude: ["./src/main.jsx", "vite.config.js"],
    },
  },
});
