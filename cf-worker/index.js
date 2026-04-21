/**
 * Serves static files from the ASSETS binding and maps extensionless paths
 * (/mission → /mission.html, /services/foo → /services/foo.html), matching serve.py.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && !last.includes(".")) {
      const candidates = [`${pathname}.html`, `${pathname}/index.html`];
      for (const path of candidates) {
        const assetUrl = `https://assets.local${path}`;
        const res = await env.ASSETS.fetch(
          new Request(assetUrl, {
            method: request.method,
            headers: request.headers,
            redirect: "manual",
          }),
        );
        if (res.status !== 404) return res;
      }
    }

    return env.ASSETS.fetch(request);
  },
};
