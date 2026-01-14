import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import prismjs from "vite-plugin-prismjs";

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/64457284/vue-runtime-esm-browser-js-does-not-render-vue-3-components
export default defineConfig({
  plugins: [
    vue(),
    prismjs({
      languages: [
        "python",
        "rust",
        "diff",
        "ruby",
        "yaml",
        "cpp",
        "javascript",
        "java",
        "parigp",
        "nix"
      ],
      css: true,
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler",
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        additionalData: `@use "@/assets/global.scss" as *;`,
      },
    },
  },
});
