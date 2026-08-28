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

## Kontaktformular

Das Formular validiert client- und serverseitig. Anfragen werden aktuell serverseitig geloggt.

**Phase 2 — E-Mail-Versand:** Env-Variablen für SMTP oder Resend/SendGrid in `server/api/contact.post.ts` ergänzen.

## Deployment

Statische Generierung für optimale Performance:

```bash
npm run generate
```

Output liegt in `.output/public/` — deploybar auf Netlify, Vercel, Cloudflare Pages oder jedem Static Host.

## Nächste Schritte

- Impressum & Datenschutz-Seiten
- Portfolio / Referenzen
- Blog via `@nuxt/content`
- E-Mail-Versand für Kontaktformular konfigurieren
