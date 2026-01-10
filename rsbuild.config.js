import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    entry: {
      index: "./src/main.js",
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  html: {
    template: "./public/index.html",
    title: "Endoctrine - Personal Site",
    meta: {
      description: "Personal GitHub Pages site built with Vue and Rsbuild",
      viewport: "width=device-width, initial-scale=1.0",
    },
  },
  output: {
    target: "web",
    cleanDistPath: true,
    distPath: {
      root: "dist",
    },
  },
  dev: {
    port: 3000,
    hot: true,
    overlay: true,
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-experience",
    },
  },
});
