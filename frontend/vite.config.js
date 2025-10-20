import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ✅ Proxy API requests to your backend
      "/message": {
        target: "http://localhost:3000", // your backend server
        changeOrigin: true, // ensures host header is rewritten
        secure: false, // allows self-signed certificates (if any)
      },

      // (Optional) add other API routes if needed:
      // "/auth": {
      //   target: "http://localhost:5000",
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
});
