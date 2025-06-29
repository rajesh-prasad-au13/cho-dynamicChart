import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-vue-inspect";

// Simplified configuration to avoid URI malformed errors
export default defineConfig({
  plugins: [vue(), Inspect()],
  server: {
    host: "localhost",
    port: 3000
  },
  resolve: {
    alias: {
      "@": "/src",
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  optimizeDeps: {
    exclude: ["tween.js", "urank_moving"]
  }
});
