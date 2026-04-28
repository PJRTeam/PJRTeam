/**
 * Serves static assets with extensionless HTML routing.
 * html_handling = "none" + run_worker_first = true in wrangler.toml gives
 * the Worker full control. This file handles all URL normalization:
 * - .html extension URLs → redirect to clean path
 * - /index or /foo/index → redirect to / or /foo
 * - trailing slashes → redirect to no-slash canonical
 * - extensionless paths → resolved to .html or /index.html assets
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // 1. Remove trailing slash and redirect (except root /)
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const canonical = new URL(request.url);
      canonical.pathname = pathname.slice(0, -1);
      return Response.redirect(canonical.href, 301);
    }

    // 2. Strip .html extension and redirect to clean URL
    //    /mission.html → /mission  |  /index.html → /  |  /services/index.html → /services
    if (pathname.endsWith('.html')) {
      const canonical = new URL(request.url);
      let clean = pathname.slice(0, -5); // remove ".html"
      if (clean.endsWith('/index')) clean = clean.slice(0, -6); // remove "/index"
      canonical.pathname = clean || '/';
      return Response.redirect(canonical.href, 301);
    }

    // 3. Redirect bare /index paths → /  (e.g. /index → /, /services/index → /services)
    if (pathname === '/index' || pathname.endsWith('/index')) {
      const canonical = new URL(request.url);
      canonical.pathname = pathname.slice(0, -6) || '/';
      return Response.redirect(canonical.href, 301);
    }

    // 4. Root path — serve index.html directly to avoid / → /index.html redirect loops
    if (pathname === '/') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url).href, request));
    }

    // 5. Try the request as-is (images, CSS, JS, exact file paths)
    const exactResponse = await env.ASSETS.fetch(request);
    if (exactResponse.status !== 404) return exactResponse;

    // 6. No file extension — try appending .html, then /index.html
    if (!pathname.match(/\.[^/]+$/)) {
      const htmlUrl = new URL(request.url);
      htmlUrl.pathname = pathname + '.html';
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl.href, request));
      if (htmlResponse.status !== 404) return htmlResponse;

      // Use replace to avoid double-slash when pathname is "/"
      const indexUrl = new URL(request.url);
      indexUrl.pathname = pathname.replace(/\/$/, '') + '/index.html';
      const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.href, request));
      if (indexResponse.status !== 404) return indexResponse;
    }

    return exactResponse; // 404
  },
};
