#!/usr/bin/env python3
"""Serve the project root; maps select URLs to files in public/ (Vite public-dir convention)."""
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(ROOT, "public")
PORT = int(os.environ.get("PORT", "5173"))

# Request path -> filename inside public/
_PUBLIC_AT_ROOT = {
    "/pjr-logo.jpg": "pjr-logo.jpg",
    "/pjr-logo.svg": "pjr-logo.svg",
    "/pjr-logo.png": "pjr-logo.png",
    "/founder-photo-new.jpg": "founder-photo-new.jpg",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        clean = path.split("?", 1)[0]
        fname = _PUBLIC_AT_ROOT.get(clean)
        if fname:
            return os.path.join(PUBLIC, fname)
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
