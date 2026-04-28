/**
 * Serves static assets with extensionless HTML routing.
 * html_handling = "none" in wrangler.toml prevents Cloudflare's
 * self-redirect loop; this Worker handles URL normalization instead.
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

    // 2. Try the request as-is first (images, CSS, JS, exact file paths)
    const exactResponse = await env.ASSETS.fetch(request);
    if (exactResponse.status !== 404) return exactResponse;

    // 3. No file extension — try appending .html, then /index.html
    if (!pathname.match(/\.[^/]+$/)) {
      const htmlUrl = new URL(request.url);
      htmlUrl.pathname = pathname + '.html';
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl.href, request));
      if (htmlResponse.status !== 404) return htmlResponse;

      const indexUrl = new URL(request.url);
      indexUrl.pathname = pathname + '/index.html';
      const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.href, request));
      if (indexResponse.status !== 404) return indexResponse;
    }

    return exactResponse; // 404
  },
};
