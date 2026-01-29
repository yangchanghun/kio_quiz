import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa"; // ⭐ 추가

export default defineConfig({
  base: "/", // 🔥 그대로 유지
  plugins: [
    react(),

    // ⭐ PWA 플러그인 추가
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "KIO Quiz",
        short_name: "KIOQuiz",
        description: "키오퀴즈",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
