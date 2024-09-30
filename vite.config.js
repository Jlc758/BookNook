import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: "/BookNook/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    outDir: "dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  define: {
    "import.meta.env.VITE_GOOGLE_BOOKS_API_KEY": JSON.stringify(
      process.env.VITE_GOOGLE_BOOKS_API_KEY
    ),
    "import.meta.env.VITE_OPENAI_API_KEY": JSON.stringify(
      process.env.VITE_OPENAI_API_KEY
    ),
  },
});
