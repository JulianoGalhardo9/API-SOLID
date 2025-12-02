import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [tsconfigPaths()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  test: {
    globals: true,
    environment: "node",

    include: ["src/**/*.spec.ts"],

    // Caso você queira separar testes e2e:
    setupFiles: [],
  },
});
