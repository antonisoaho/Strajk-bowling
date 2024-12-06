import { defineConfig } from "vitest/config";
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
  },
  resolve: {
    alias: {
      "\\.scss$": "./src/__mocks__/styleMock.js",
    },
  },
});
