// Post-build step for the GitHub Pages static deploy.
//
// The app references Lovable-hosted media via root-absolute "/__l5e/assets-v1/…"
// URLs. GitHub Pages serves this project from a sub-path ("/gold-sheen-designs/")
// and has no Lovable asset proxy, so this script:
//   1. Finds every /__l5e/assets-v1/… reference in the built output.
//   2. Downloads each asset from the published Lovable site into the output so
//      the static site is fully self-contained.
//   3. Rewrites those references to include the GitHub Pages base path.
//   4. Adds a 404.html SPA fallback and a .nojekyll marker.
//
// Run automatically by `npm run build:ghpages`.

import { promises as fs } from "node:fs";
import path from "node:path";

const BASE = "/gold-sheen-designs/";
const PUBLISH_DIR = path.resolve("dist/client");
// Assets are downloaded from the live Lovable deployment.
const SOURCE_HOST = "https://gold-sheen-designs.lovable.app";
const ASSET_RE = /\/__l5e\/assets-v1\/[A-Za-z0-9-]+\/[^"'`)\\\s]+/g;
const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".txt", ".json", ".xml"]);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function main() {
  const files = await walk(PUBLISH_DIR);

  // 1. Collect every referenced Lovable asset path.
  const assetPaths = new Set();
  const textFiles = [];
  for (const file of files) {
    if (!TEXT_EXT.has(path.extname(file))) continue;
    const content = await fs.readFile(file, "utf8");
    textFiles.push(file);
    for (const match of content.matchAll(ASSET_RE)) assetPaths.add(match[0]);
  }
  console.log(`[ghpages] Found ${assetPaths.size} Lovable asset reference(s).`);

  // 2. Download each asset into the publish dir (preserving its path).
  let downloaded = 0;
  for (const assetPath of assetPaths) {
    const dest = path.join(PUBLISH_DIR, decodeURIComponent(assetPath));
    try {
      await fs.access(dest);
      continue; // already downloaded
    } catch {
      /* fall through to download */
    }
    const url = `${SOURCE_HOST}${assetPath}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    downloaded += 1;
  }
  console.log(`[ghpages] Downloaded ${downloaded} asset file(s).`);

  // 3. Rewrite references to include the base path.
  for (const file of textFiles) {
    const content = await fs.readFile(file, "utf8");
    if (!content.includes("/__l5e/assets-v1/")) continue;
    const rewritten = content.replaceAll(
      "/__l5e/assets-v1/",
      `${BASE}__l5e/assets-v1/`,
    );
    await fs.writeFile(file, rewritten);
  }
  console.log("[ghpages] Rewrote asset references to the base path.");

  // 4. SPA fallback + Jekyll opt-out.
  await fs.copyFile(
    path.join(PUBLISH_DIR, "index.html"),
    path.join(PUBLISH_DIR, "404.html"),
  );
  await fs.writeFile(path.join(PUBLISH_DIR, ".nojekyll"), "");
  console.log("[ghpages] Wrote 404.html and .nojekyll.");
  console.log(`[ghpages] Done. Publish directory: ${PUBLISH_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
