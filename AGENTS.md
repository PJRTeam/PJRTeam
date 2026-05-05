# Agent instructions — PJR Team website

## Vendored Claude / Cursor skills

| Pack | Path | Upstream |
|------|------|----------|
| Marketing skills | `.agents/marketingskills/` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| UI UX Pro Max | `.agents/ui-ux-pro-max-skill/` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |

Individual skills are Markdown files: `SKILL.md` inside each skill folder. The marketing pack expects a product context file at **`.agents/product-marketing-context.md`** (maintained for this client).

## Pages

- `index.html` — Home
- `mission.html` — Mission, vision, values
- `founder.html` — Meet the founder (headshot: `public/founder-photo.jpg`, same URL path via `serve.py`)

## Local development

**Easiest (no Node):** styles use the Tailwind CDN in `index.html`. Local server is `serve.py` (maps `/pjr-logo.svg`, `/pjr-logo.jpg`, and founder image URLs into `public/`).

```bash
./launch.sh
```

Then open **http://localhost:5173/** (or `PORT=8080 ./launch.sh`).

**With Node / Vite** (optional; uses PostCSS build instead of CDN):

```bash
npm install
npm run dev
```

Production build: `npm run build` → `dist/` (for that pipeline, remove or reconcile the CDN block in `index.html` so you don’t load Tailwind twice).

## Cursor

Project rule **`.cursor/rules/use-vendored-skills.mdc`** is set to always apply so agents use the paths above.
