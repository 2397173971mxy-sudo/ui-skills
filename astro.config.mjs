import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ui-skills.com",
  trailingSlash: "ignore",
  output: "server",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      // Rebuild the dev cache after dependency/config changes, but do not force
      // an unnecessary optimizer pass during production builds.
      force: process.argv.includes("dev"),
      // These SSR imports are incompatible with Cloudflare's workerd optimizer.
      exclude: ["marked", "@base-ui/react/switch"],
    },
    ssr: {
      external: ["node:fs", "node:path"],
    },
  },
});
