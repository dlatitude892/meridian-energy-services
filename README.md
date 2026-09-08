# Meridian Energy Services — Website

A premium, animated marketing site for an international oil & gas services and
contracting company, built as a React + Vite single-page app with Tailwind CSS,
client-side routing, and a Netlify Functions + Netlify Blobs backend for all
editable content (services, projects, news, employees, gallery, locations,
jobs, applications, inquiries, clients, and staff accounts).

## Run it locally

This project uses a Netlify serverless function (`/api/content`) for reading
and saving site content, so a plain `vite` dev server isn't enough on its own.

```bash
npm install
npm install -g netlify-cli   # one-time, if you don't have it
netlify dev
```

`netlify dev` serves the React app and the function together (usually at
`http://localhost:8888`). Admin/staff logins and content editing only work
this way — running `npm run dev` alone will show the site with default
content but the "couldn't reach the content API" banner, since there's no
function server behind it.

## Deploying to Netlify

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build settings are already defined in `netlify.toml` (`npm run build`,
   publish directory `dist`, functions directory `netlify/functions`) — Netlify
   should detect them automatically.
4. Deploy. Netlify Blobs works automatically on Netlify's infrastructure, no
   extra setup or environment variables required.

You can also deploy directly from the CLI: `netlify deploy --prod`.

## Logging in

- **Admin Dashboard:** go to `/admin/login`. Default password: `meridian2026admin`
  — change this in `src/lib/auth.js` (`ADMIN_PASSWORD`) before you launch.
- **Staff Portal:** go to `/staff/login`. A demo account is seeded:
  `staff@meridianenergyservices.com` / `meridianstaff2026`. Manage staff
  accounts, emails, access codes and permissions from the Admin Dashboard's
  "Staff Accounts" tab.

Both logins are lightweight, client-side gates suitable for a small internal
team editing marketing content — there's no real backend session/auth system
behind them. If this site will ever hold non-public information, that's worth
upgrading to real authentication (e.g. Netlify Identity or a proper auth
provider) before relying on it.

## Editing content

Everything the Admin Dashboard manages — services, projects, news, employees,
gallery photos, office locations, job vacancies, clients/partners, staff
accounts, job applications, contact inquiries, and site-wide text/stats — is
stored as one JSON document in Netlify Blobs and edited live through the
dashboard. No database setup, no CMS, no external accounts needed.

Images are uploaded as optimized inline images (base64) capped at ~1.75MB
each, stored directly in that JSON document — fine for a site like this at a
moderate scale. If the image library grows very large, swapping in a proper
media host (e.g. Cloudinary) and storing URLs instead is a natural next step.

## Project structure

```
src/
  components/       shared UI (nav, footer, cards, hero, admin form widgets)
  lib/               content schema, seed data, auth, icon registry
  pages/             one file per route (see src/App.jsx for the full route list)
netlify/functions/    content.js — the GET/PUT content API, backed by Netlify Blobs
scripts/               generate-seed.mjs — regenerates the first-run seed content
```
