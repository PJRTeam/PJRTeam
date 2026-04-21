import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

/** Dev-only: mirror serve.py extensionless routes (/mission → mission.html). */
function extensionlessHtml() {
  return {
    name: "extensionless-html",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url || "/";
        const [pathname, query = ""] = raw.split("?");
        if (!pathname || pathname === "/" || path.extname(pathname)) {
          return next();
        }
        const clean = pathname.replace(/\/$/, "") || "/";
        const rel = clean === "/" ? "" : clean.slice(1);
        if (!rel) return next();

        const base = path.join(root, rel);
        const htmlFile = `${base}.html`;
        if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
          req.url = `/${rel}.html${query ? `?${query}` : ""}`;
          return next();
        }
        const indexFile = path.join(base, "index.html");
        if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
          req.url = `/${rel}/index.html${query ? `?${query}` : ""}`;
          return next();
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: ".",
  publicDir: "public",
  plugins: [extensionlessHtml()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
