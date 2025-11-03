import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "black-olives": resolve(__dirname, "projects/black-olives.html"),
        Gotujto: resolve(__dirname, "projects/Gotujto.html"),
        "personal-blog": resolve(__dirname, "projects/personal-blog.html"),
        "task-manager-app": resolve(
          __dirname,
          "projects/task-manager-app.html"
        ),
      },
    },
  },
});
