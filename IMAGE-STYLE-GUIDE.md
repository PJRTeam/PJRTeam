# PJR Team — Illustration Style Guide

This document describes how the site illustrations were created so future images can be generated consistently.

---

## Style

**Flat vector illustration** — clean lines, no gradients, no drop shadows, no photorealism.
Inspired by modern editorial and SaaS marketing illustration styles.

Key characteristics:
- Charcoal (`#1C1C1C`) outlines throughout
- Flat color fills with no shading or depth effects
- Simple, expressive character faces
- Decorative plants and natural elements to add warmth
- Scenes feel calm, professional, and approachable

---

## Color Palette

| Role | Color | Hex |
|---|---|---|
| Background | Cream white | `#FAFAFA` |
| Accent / primary | Sage green | `#C4C7B5` |
| Fills / panels | Warm stone | `#D8D3CB` |
| Outlines | Charcoal | `#1C1C1C` |
| Stars / highlights | Soft gold | `#D4A847` |

---

## The Founder Character (Brittney)

All illustrations feature a consistent blonde female character representing the founder:

- **Hair:** Shoulder-length, wavy, warm blonde
- **Skin:** Light, warm tone
- **Outfit:** Sage green blazer over a white top, dark trousers
- **Expression:** Confident, approachable smile
- **Accessories:** Simple gold earrings, gold necklace

When writing prompts, describe her as:
> *"A blonde woman with wavy shoulder-length hair and a sage green blazer over a white top"*

---

## Images Created

### Founder Portrait (`public/founder-illustration.png`)
Portrait orientation (3:4). Brittney seated in a cream chair, hands folded, with a warm stone panel behind her and a small succulent on a side table.

### Open Graph Images (`public/og/`)
1600×900px landscape. Each page has a unique scene. All use the same color palette and Brittney character.

| File | Scene |
|---|---|
| `og-home.png` | Brittney at a digital command center with healthcare icons |
| `og-mission.png` | Brittney planting a flag on a hill with a glowing path |
| `og-founder.png` | Brittney in a warm office setting with a coffee and plant |
| `og-services.png` | Brittney surrounded by service category icons |
| `og-digital-governance.png` | Dashboard with platform icons and access controls |
| `og-reputation-risk.png` | Shield with heart, 5 stars, review bubbles |
| `og-partnership-support.png` | Brittney with a healthcare professional at a laptop |
| `og-technology-security.png` | Padlock network diagram with devices |
| `og-websites-rebrands.png` | Old vs new website with crane transformation |

### Service Images (`public/service-*.png`)
Wide landscape (~14:9). Used as the hero image on each service page.

| File | Scene |
|---|---|
| `service-digital-governance.png` | Brittney at a dashboard wall — social platforms, access grid, content calendar |
| `service-reputation-risk.png` | Brittney holding a heart-shield beside a magnifying glass over star reviews |
| `service-partnership-support.png` | Brittney and a healthcare professional in scrubs reviewing a report together |
| `service-technology-security.png` | Brittney beside a padlock connected to server, cloud, laptop, tablet, phone |
| `service-rebrands.png` | Brittney with blueprints between an old cluttered site and a clean new one |

---

## Prompt Template

Use this structure when generating new images in this style:

```
Flat vector illustration, [orientation]. [Scene description]. 
[Include Brittney if appropriate: "A blonde woman with wavy shoulder-length hair 
and a sage green blazer stands/sits [action/position]."]
[Scene elements and props.]
Color scheme: cream white (#FAFAFA) background, sage green (#C4C7B5) accents, 
warm stone (#D8D3CB) fills, charcoal (#1C1C1C) outlines. 
Clean flat illustration, no gradients, no text.
```

---

## Tool Used

Images were generated using the **AI image generation** tool inside Cursor with detailed text prompts. No reference images were used — all character and style consistency was achieved through consistent prompt language.
