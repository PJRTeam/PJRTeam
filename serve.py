#!/usr/bin/env python3
"""Serve the project root; maps select URLs to files in public/ (Vite public-dir convention).

Also resolves extensionless paths (e.g. /mission -> mission.html, /services/foo -> services/foo.html).
"""
import http.server
import os
import socketserver
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(ROOT, "public")
PORT = int(os.environ.get("PORT", "5173"))

# Request path -> filename inside public/
_PUBLIC_AT_ROOT = {
    "/pjr-logo.jpg": "pjr-logo.jpg",
    "/pjr-logo.svg": "pjr-logo.svg",
    "/pjr-logo.png": "pjr-logo.png",
    "/founder-photo-new.jpg": "founder-photo-new.jpg",
    "/founder-photo.jpg": "founder-photo.jpg",
}

_REDIRECTS = {
    "/improve-your-census": "/census",
    "/improve-your-census.html": "/census",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _redirect_if_needed(self):
        parsed = urllib.parse.urlparse(self.path)
        clean = urllib.parse.unquote(parsed.path.split("?", 1)[0].split("#", 1)[0])
        dest = _REDIRECTS.get(clean)
        if not dest:
            return False
        if parsed.query:
            dest = dest + "?" + parsed.query
        self.send_response(301)
        self.send_header("Location", dest)
        self.end_headers()
        return True

    def do_GET(self):
        if self._redirect_if_needed():
            return
        return super().do_GET()

    def do_HEAD(self):
        if self._redirect_if_needed():
            return
        return super().do_HEAD()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def translate_path(self, path):
        parsed = urllib.parse.urlparse(path)
        clean = urllib.parse.unquote(parsed.path.split("?", 1)[0].split("#", 1)[0])
        if clean in _PUBLIC_AT_ROOT:
            return os.path.join(PUBLIC, _PUBLIC_AT_ROOT[clean])

        rel = clean.lstrip("/")
        if ".." in rel.split("/"):
            return super().translate_path(path)

        fs_try = os.path.normpath(os.path.join(ROOT, rel))
        root_norm = os.path.normpath(ROOT)
        if fs_try != root_norm and not fs_try.startswith(root_norm + os.sep):
            return super().translate_path(path)

        if os.path.isfile(fs_try):
            return fs_try
        if os.path.isfile(fs_try + ".html"):
            return fs_try + ".html"
        if os.path.isdir(fs_try):
            idx = os.path.join(fs_try, "index.html")
            if os.path.isfile(idx):
                return idx
        return super().translate_path(path)


def main() -> None:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n  PJR Team site → http://localhost:{PORT}/\n  Press Ctrl+C to stop.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
            sys.exit(0)


if __name__ == "__main__":
    main()
