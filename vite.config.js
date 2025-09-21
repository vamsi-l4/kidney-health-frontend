import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion", "lucide-react"],
          "pdf-vendor": ["jspdf", "html2canvas"],
          axios: ["axios"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: "esbuild", // ✅ use esbuild (faster, no terser install needed)
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion", "axios"],
  },
});
