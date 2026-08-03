# Gen's Arts

Static portfolio + order-enquiry site for **[@gens.arts](https://www.instagram.com/gens.arts/)** — handmade resin keepsakes, scented candles and personalised return favours.

Built as a flat HTML/CSS/JS site so it can be hosted free on Vercel, Netlify or GitHub Pages with zero build step.

## Live site

To be added on launch (target: **16 May 2026**).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Hero, four product categories, signature quote |
| `gallery.html` | Filterable masonry gallery of all pieces + lightbox |
| `about.html` | Artist story + occasions served |
| `contact.html` | Order-enquiry form that opens WhatsApp pre-filled |

## Stack

- Pure HTML, CSS (custom, no framework), vanilla JS
- Google Fonts: Cormorant Garamond + Inter
- Form submissions route directly to WhatsApp (no backend / no email relay)

## Local development

```bash
# from the repo root
python -m http.server 8000
# visit http://localhost:8000/
```

Any static file server works (`npx serve`, `php -S`, etc.).

## Configuration

A few values are hard-coded across files. Search-and-replace if they change:

| Value | Where |
|---|---|
| WhatsApp number `919326198790` | `index.html`, `gallery.html`, `about.html`, `contact.html`, `script.js` |
| Instagram URL `https://www.instagram.com/gens.arts/` | all four HTML files |
| Colour palette | top of `styles.css` (`--bg`, `--ink`, `--accent`, `--muted`, `--line`) |

## Deploy (Vercel)

1. Import the repo on https://vercel.com/new.
2. Framework preset: **Other** (static).
3. Leave build command and output directory blank — `vercel.json` handles caching.
4. Deploy. You'll get a `*.vercel.app` URL.
5. Add the custom domain under Project → Settings → Domains.

## Project structure

```
.
├── index.html
├── gallery.html
├── about.html
├── contact.html
├── styles.css
├── script.js
├── vercel.json
├── images/
│   ├── gens-01.jpg
│   ├── gens-02.jpg
│   └── ... (gens-01 through gens-30)
└── README.md
```

## License

All artwork © Gen's Arts. Source code is the property of the site owner.
