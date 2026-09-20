import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const PAGES_BASE = "/mn-pi-atlas/";

/**
 * Static SPA build for GitHub Pages. The live Grok preview still uses
 * vite.config.ts (Vercel nitro, port 8080).
 */
export default defineConfig({
  base: PAGES_BASE,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: { enabled: true },
      router: { basepath: "/mn-pi-atlas" },
    }),
    nitro({
      preset: "node",
    }),
    viteReact(),
  ],
});
