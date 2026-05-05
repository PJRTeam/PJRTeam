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


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

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
