import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "lowercase-filenames",
      generateBundle(_, bundle) {
        for (const fileName in bundle) {
          const asset = bundle[fileName];
          const newFileName = fileName.toLowerCase();
          if (newFileName !== fileName) {
            asset.fileName = newFileName;
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      "/api/grids/": "http://localhost:8000",
    },
  },
  build: {
    outDir: "../static/dist",
    emptyOutDir: true,
    assetsDir: "assets",
    manifest: true,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: "assets/[name].[hash].[ext]",
    //     chunkFileNames: "assets/[name].[hash].[ext]",
    //     assetFileNames: "assets/[name].[hash].[ext]",
    //   },
    // },
  },
});
