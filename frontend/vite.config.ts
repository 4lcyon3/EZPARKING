import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import wails from "@wailsio/runtime/plugins/vite";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "WAILS_");

  return {
    server: {
      host: "127.0.0.1",
      port: Number(env.WAILS_VITE_PORT) || 9245,
      strictPort: true,
    },
    plugins: [react(), wails("./bindings")],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public')
    }
  },
  };
});
