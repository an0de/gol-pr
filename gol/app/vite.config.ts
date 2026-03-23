import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 8080,
    cors: true,
    origin: "http://127.0.0.1:8000",
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      "/api/grids/": "http://localhost:8000",
    },
  },
  base: "/static/dist",
  build: {
    outDir: "../static/dist",
    emptyOutDir: true,
    assetsDir: "assets",
    manifest: "manifest.json",
    rollupOptions: {
      input: "src/main.tsx",
    },
  },
});
