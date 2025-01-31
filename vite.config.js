import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // base url 2:211016310007_DavidJonathanTjong/assets/index-GfqnU3yo.js
    // untuk menerapkan link default
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
