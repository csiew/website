import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import ReactCompiler from "babel-plugin-react-compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react({
        babel: {
          plugins: [ReactCompiler],
        },
      }),
      optimizeLodashImports()
    ],
  assetsInclude: ["**/*.md"],
  build: {
    outDir: "./dist",
    rollupOptions: {
      output: {
        minifyInternalExports: true
      }
    },
    minify: true,
    cssMinify: true,
    reportCompressedSize: true,
  }
});
