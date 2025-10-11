import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,   // no saltar a 5174
    host: "localhost",  // evitar alternar con 127.0.0.1
  },
});
