/**
 * Forwards all requests to Static Assets. Cloudflare applies html_handling
 * (default: auto-trailing-slash), so /mission serves mission.html without
 * custom rewrite logic—doing both caused ERR_TOO_MANY_REDIRECTS.
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
