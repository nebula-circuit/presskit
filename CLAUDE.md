# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Presskit site for "Nebula Circuit" (electronic music artist). Built with React Router 7 in SPA mode, Material UI 7, and i18next for bilingual content (ES/EN).

## Commands

```bash
pnpm setup        # Install deps (uses --ignore-workspace)
pnpm dev          # Start dev server with HMR
pnpm build        # Production build (output: /build)
pnpm typecheck    # react-router typegen && tsc
pnpm lint         # ESLint
pnpm format       # Prettier
```

For GitHub Pages build: `GITHUB_PAGES=true pnpm build` (sets basename to `/presskit/`).

A Husky pre-commit hook runs `lint-staged` (prettier + eslint on staged files) and `typecheck` on every commit. `pnpm format:check` is available for CI validation.

## Architecture

### Routing

Routes are defined in `app/routes.ts` using React Router's config API (`layout()`, `route()`, `index()`). All pages share the `routes/main/page.tsx` layout (AppBar, Drawer, Footer). Route path constants live in the `Routes` object (`as const`) in `app/routes.ts`.

SSR is disabled (`ssr: false` in `react-router.config.ts`) — this is a client-side SPA.

### Content & i18n

All user-facing text (bios, release info, routing labels) lives in `app/locales/en.json` and `app/locales/es.json`. There is no CMS or API — content changes go directly in these JSON files. Language preference persists in localStorage under key `app-lang`, defaulting to Spanish.

### Styling

Each route/component has a co-located `style.ts` exporting MUI `sx` prop objects. The global theme (`app/theme.tsx`) uses a dark palette with cyan/magenta accents and JetBrains Mono font. Emotion handles CSS-in-JS with `@layer` support via `app/createCache.ts`.

### Page Structure

Each route folder (`routes/<name>/`) contains:

- `page.tsx` — the page component
- `style.ts` — MUI sx-prop style objects

Reusable components are in `app/components/` (drawer, language-switch). Custom hooks are in `app/hooks/`.

### Static Assets

Public assets live in `public/assets/`. Image paths are referenced via `import.meta.env.BASE_URL` (changes between local dev and GitHub Pages deployment). Images are WebP format.

### Build Notes

`vite.config.ts` includes a custom `muiJsxPlugin` to handle MUI packages that ship `.js` files containing JSX. This is required for Vite's import analysis to work with MUI 7.

## Code Conventions

- **No semicolons**, single quotes, 2-space indent, 100 char line width, trailing commas (es5) — enforced by Prettier
- Path alias: `~/` maps to `app/`
- Node >= 24 required (`.nvmrc` / `.node-version`)
- Package manager: pnpm 10.x
