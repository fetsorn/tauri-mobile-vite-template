import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { internalIpV4 } from 'internal-ip'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const host = await internalIpV4()

  /** @type {import('vite').UserConfig} */
  const config = {
    plugins: [preact()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    // server: {
    //   port: 1420,
    //   strictPort: true,
    // },
    server: {
      host: '0.0.0.0', // listen on all addresses
      port: 1420,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host,
        port: 1420,
      },
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
  }

  return config
})
