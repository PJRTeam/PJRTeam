#!/usr/bin/env python3
"""Inject shared CSS/JS and convert wrapping mobile nav to a hamburger panel."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CSS_TAG = '    <link rel="stylesheet" href="/public/css/site.css" />\n'
JS_TAG = '    <script src="/public/js/site.js" defer></script>\n'

TOGGLE = """        <button
          type="button"
          class="nav-toggle"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="mobile-panel"
          aria-label="Open menu"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
"""

MOBILE_RE = re.compile(
    r"        <div class=\"flex flex-wrap items-center justify-end gap-x-2 gap-y-1 md:hidden\">\n"
    r"(?P<inner>.*?)"
    r"        </div>\n"
    r"      </div>\n"
    r"    </header>",
    re.S,
)

YEAR_ONLY_RE = re.compile(
    r"    <script>\n"
    r"      \(function \(\) \{\n"
    r"        var (?:yearEl|y) = document\.getElementById\(\"year\"\);\n"
    r"        if \((?:yearEl|y)\) (?:yearEl|y)\.textContent = String\(new Date\(\)\.getFullYear\(\)\);\n"
    r"      \}\)\(\);\n"
    r"    </script>\n",
)


def patch(path: Path) -> bool:
    original = text = path.read_text()

    if "site.css" not in text:
        text = text.replace("  </head>", CSS_TAG + "  </head>", 1)

    if "site.js" not in text:
        text = text.replace("  </body>", JS_TAG + "  </body>", 1)

    if 'class="site-header sticky' not in text:
        text = text.replace(
            'class="sticky top-0 z-50 border-b',
            'class="site-header sticky top-0 z-50 border-b',
            1,
        )

    def repl(match: re.Match[str]) -> str:
        inner = match.group("inner")
        inner = inner.replace(
            "rounded-full bg-brand-ink px-3 py-2 text-sm font-semibold text-white",
            "mobile-cta rounded-full bg-brand-ink px-3 py-2 text-sm font-semibold text-white",
            1,
        )
        return (
            TOGGLE
            + "      </div>\n"
            + '      <div id="mobile-panel" class="mobile-panel" hidden>\n'
            + inner
            + "      </div>\n"
            + "    </header>"
        )

    if 'id="mobile-panel"' not in text:
        text, n = MOBILE_RE.subn(repl, text, count=1)
        if n != 1:
            print(f"WARN: mobile nav not rewritten: {path.relative_to(ROOT)}")

    # Drop redundant year-only scripts now handled by site.js.
    if path.name != "index.html":
        text = YEAR_ONLY_RE.sub("", text)

    if text != original:
        path.write_text(text)
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(ROOT.rglob("*.html")):
        if "/.agents/" in str(path) or "/node_modules/" in str(path):
            continue
        if patch(path):
            changed.append(str(path.relative_to(ROOT)))
    print("updated", len(changed), "files")
    for name in changed:
        print(" ", name)


if __name__ == "__main__":
    main()
