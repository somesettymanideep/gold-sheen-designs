// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages static build. Activated only when GITHUB_PAGES=true (set by the
// GitHub Actions workflow / `npm run build:ghpages`). The normal Lovable
// preview and Cloud builds run with GITHUB_PAGES unset and keep the default
// server-rendered configuration untouched.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

// Served from a custom domain (durgahardwareandplywood.com) at the root path,
// so assets resolve from "/" — not from a repo sub-path.
const GH_PAGES_BASE = "/";

export default isGitHubPages
  ? defineConfig({
      // Fully static: prerender every route to HTML + ship a client-side SPA
      // fallback so deep links and client navigation work on GitHub Pages.
      tanstackStart: {
        spa: { enabled: true },
        prerender: { enabled: true, crawlLinks: true },
      },
      // Disable Nitro so TanStack Start emits its native static output that the
      // prerender step can render against (Nitro renames the server entry and
      // breaks the prerender preview server).
      nitro: false,
      vite: {
        base: GH_PAGES_BASE,
      },
    })
  : defineConfig({
      tanstackStart: {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        server: { entry: "server" },
      },
    });
