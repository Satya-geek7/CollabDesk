import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ✅ You need this

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ Works for @ as src
    },
  },
});
