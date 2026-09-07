# Signal Software

Deutschsprachige One-Pager-Landingpage für **Signal Software** — Spezialist für Softwareentwicklung und conversion-starke Landingpages mit **Nuxt.js**.

## Tech-Stack

- [Nuxt 4](https://nuxt.com/) + Vue 3 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) für Formular-Validierung
- Nitro Server Route für Kontaktanfragen

## Setup

```bash
npm install
npm run dev
```

Die Seite läuft unter [http://localhost:3000](http://localhost:3000).

## Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Production-Build erstellen |
| `npm run generate` | Statische Seite generieren (SSG) |
| `npm run preview` | Production-Build lokal testen |

## Projektstruktur

```
app/
├── pages/index.vue          # One-Pager
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, Leistungen, Prozess, etc.
│   └── ui/                  # Button, Formular, SectionHeading
├── composables/             # useScrollTo
server/
└── api/contact.post.ts      # Kontaktformular-Endpoint
assets/css/main.css          # Design-Tokens & globale Styles (unter app/)
```

## Kontaktformular & Admin

Kontaktanfragen werden in SQLite (`.data/signal.db`) als Leads gespeichert.

**Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)  
Login-Daten in `.env` (siehe `.env.example`):

- `NUXT_ADMIN_EMAIL`
- `NUXT_ADMIN_PASSWORD`
- `NUXT_SESSION_PASSWORD` (min. 32 Zeichen)

Im Admin kannst du Leads einsehen und Blog-Beiträge erstellen. Öffentlich: `/blog`.

**Hinweis:** Für Admin + Leads brauchst du einen Node-Server (`npm run build` + `node .output/server/index.mjs`), kein reines Static Hosting.

## Deployment

```bash
npm run build
node .output/server/index.mjs
```

Für rein statische Landingpage ohne Admin: `npm run generate`.
