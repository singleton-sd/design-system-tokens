# Agent Working Agreements

Cross-agent instructions for `@singleton-sd/tokens`.

## ClickUp

Default destination is the Design System list (same as assets):

- List: Design System - Singleton (`901614701551`)
- Prefix: `DS`
- URL: https://app.clickup.com/90161394355/v/li/901614701551

Read `../assets/config/clickup-defaults.json` when that checkout is available. Use list statuses `to do` / `in progress` / `complete`.

## Token rules

See [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md). Gallery/agent identity copy is [DESIGN.md](DESIGN.md).

- Values live in `src/tokens/` (DTCG `$value` / `$type`).
- CSS prefix is `--ssd-`. Do not reintroduce `--fg-*` aliases.
- `yarn build` emits CSS, SCSS, Tailwind theme, JS, `dist/tokens.json`, iOS Swift, Android XML, Flutter Dart.
- Penpot is the style-guide home; this package is the value source of truth.
- Do not embed logo binaries here. Use `@singleton-sd/assets`.

## Git

Work in a dedicated worktree off `origin/main`. Branch: `feature/<DS-n>-<kebab-title>`. Never commit on the shared `main` checkout.
