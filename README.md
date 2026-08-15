# Singleton SD Design Tokens

[![Latest Release](https://gitlab.com/singleton-sd/design-system/tokens/-/badges/release.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/releases)
[![pipeline status](https://gitlab.com/singleton-sd/design-system/tokens/badges/main/pipeline.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[`@singleton-sd/tokens`](https://gitlab.com/singleton-sd/design-system/tokens)
is the value source of truth for Singleton SD. It publishes DTCG JSON plus
built CSS, SCSS, Tailwind, JavaScript, iOS, Android, and Flutter artifacts.

Penpot is the style-guide home. Logo binaries live in
[`@singleton-sd/assets`](https://gitlab.com/singleton-sd/design-system/assets).
The CSS prefix is `--ssd-`. There are no `--fg-*` aliases.

[Public gallery](https://tokens.design.singletonsd.com/) ·
[GitLab Pages](https://singleton-sd.gitlab.io/design-system/tokens/) ·
[Foundations](docs/FOUNDATIONS.md) ·
[DESIGN.md](DESIGN.md) ·
[AGENTS.md](AGENTS.md)

## Public gallery

GitLab Pages serves `dist/` as a browser reference:

- Primary: [https://tokens.design.singletonsd.com/](https://tokens.design.singletonsd.com/)
- Fallback: [https://singleton-sd.gitlab.io/design-system/tokens/](https://singleton-sd.gitlab.io/design-system/tokens/)

The gallery is `dist/index.html`. It demonstrates light and dark via
`data-theme`, semantic `--ssd-*` colors, core palettes, and CSS usage.

## Token layers

Values live in `src/tokens/` (W3C DTCG `$value` / `$type`):

| Layer | File | Role |
| --- | --- | --- |
| Primitive | `src/tokens/core.json` | Color ramps, type, space, radius, motion |
| Semantic | `src/tokens/semantic/{light,dark}.json` | Intent aliases such as `color.text.default` |
| Component | `src/tokens/components.json` | Brand-asset tokens (logo padding/gap) |

`yarn build` emits `dist/` for every platform. CSS names are `--ssd-` plus the
kebab path (`color.text.muted` → `--ssd-color-text-muted`). Light and dark
share names and swap values.

## Install

Point the `@singleton-sd` scope at GitLab’s npm registry in `.npmrc`:

```ini
@singleton-sd:registry=https://gitlab.com/api/v4/packages/npm/
```

```sh
npm install @singleton-sd/tokens
```

```sh
yarn add @singleton-sd/tokens
```

Package entry points:

| Export | File |
| --- | --- |
| `@singleton-sd/tokens/css/light` | `dist/css/light.css` |
| `@singleton-sd/tokens/css/dark` | `dist/css/dark.css` |
| `@singleton-sd/tokens/css/root/light` | `dist/css/root/light/_variables.css` |
| `@singleton-sd/tokens/css/root/dark` | `dist/css/root/dark/_variables.css` |
| `@singleton-sd/tokens/scss` | `dist/scss/_tokens.scss` |
| `@singleton-sd/tokens/scss/light` | `dist/scss/light/_variables.scss` |
| `@singleton-sd/tokens/scss/dark` | `dist/scss/dark/_variables.scss` |
| `@singleton-sd/tokens/css-vars` | `dist/css-vars/index.mjs` (+ `index.d.mts`) |
| `@singleton-sd/tokens/tailwind` | `dist/tailwind/theme.js` |
| `@singleton-sd/tokens/js` | `dist/js/tokens.mjs` |
| `@singleton-sd/tokens/tokens.json` | `dist/tokens.json` |

## Usage

### CSS (`data-theme`)

```css
@import '@singleton-sd/tokens/css/light';
@import '@singleton-sd/tokens/css/dark';

body {
  background-color: var(--ssd-color-background-default);
  color: var(--ssd-color-text-default);
}

.button {
  background: var(--ssd-color-background-brand);
  color: var(--ssd-color-text-on-brand);
}
```

```html
<html data-theme="dark">
  <!-- or "light" -->
</html>
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

### CSS (`:root`, no theme switcher)

```css
@import '@singleton-sd/tokens/css/root/light';
```

### SCSS

```scss
@use '@singleton-sd/tokens/scss/light' as tokens;

body {
  background-color: tokens.$ssd-color-background-default;
  color: tokens.$ssd-color-text-default;
}
```

Use the generated `$ssd-*` names from `dist/scss/{light,dark}/_variables.scss`.

### CSS vars (framework-agnostic)

`dist/css-vars/index.mjs` maps DTCG token paths to `var(--ssd-*)` strings only (no resolved colors, no Tailwind `DEFAULT` keys). Import the matching CSS theme as well.

```js
import cssVars from '@singleton-sd/tokens/css-vars';

const page = {
  color: cssVars.color.text.default,
  background: cssVars.color.background.default,
  fontFamily: cssVars.font.family.body,
};
```

Feedback roles keep full semantic nesting (`color.feedback.danger.text` / `.background` / `.border`).

### Tailwind

`dist/tailwind/theme.js` is derived from the css-vars map (lossy reshape for Tailwind: `default` → `DEFAULT`, feedback text-only). Import the matching CSS file as well.

```js
import singletonTokens from '@singleton-sd/tokens/tailwind';

export default {
  ...singletonTokens,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...singletonTokens.theme,
    extend: {
      // Project extensions
    },
  },
};
```

### JavaScript

```js
import { light, dark } from '@singleton-sd/tokens/js';
```

### Penpot / raw JSON

Penpot can load the published DTCG file:

[https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json](https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json)

Figma is reference-only. Do not treat Tokens Studio as the pipeline.

### CDN / GitLab Pages

Pages serves `dist/` at the site root. Use a release tag in production.

Latest (`main`):

```html
<link
  rel="stylesheet"
  href="https://tokens.design.singletonsd.com/css/light/_variables.css"
/>
<link
  rel="stylesheet"
  href="https://tokens.design.singletonsd.com/css/dark/_variables.css"
/>
```

GitLab Pages fallback:

```html
<link
  rel="stylesheet"
  href="https://singleton-sd.gitlab.io/design-system/tokens/css/dark/_variables.css"
/>
```

Tagged release (replace `1.3.0` with the tag you need):

```html
<link
  rel="stylesheet"
  href="https://tokens.design.singletonsd.com/1.3.0/css/dark/_variables.css"
/>
```

Branch previews: GitLab lowercases the branch and replaces other characters
with hyphens (`feature/dark-mode` → `/feature-dark-mode/`).

| Use case | URL path | Description |
| --- | --- | --- |
| Production | `/1.3.0/` | Locked to a released tag |
| Staging / Dev | `/` | Latest from `main` |
| Feature testing | `/feature-name/` | Preview from a sanitized branch |

### Native

`yarn build` also writes:

- iOS: `dist/ios/{light,dark}/StyleDictionary.swift`
- Android: `dist/android/{light,dark}/colors.xml` and `dimens.xml`
- Flutter: `dist/flutter/{light,dark}/style_dictionary.dart`

These paths are in `dist/` for app checkouts. They are not npm `exports`.

## Local development

```sh
git clone https://gitlab.com/singleton-sd/design-system/tokens.git
cd tokens
yarn install
yarn build
```

Edit `src/tokens/`, then rebuild. New semantic roles belong in both light and
dark files. See [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md). Gallery and agent
copy: [DESIGN.md](DESIGN.md). Agent working agreements: [AGENTS.md](AGENTS.md).

## Versioning

This package follows [Semantic Versioning](https://semver.org/). Releases use
`yarn release` locally and `yarn release:ci` in GitLab CI.

## Contributing

Work in a dedicated worktree off `origin/main`. Branch as
`feature/<DS-n>-<kebab-title>` (ClickUp Design System list). Open a merge
request against `main`. Do not commit on the shared `main` checkout. Follow
[AGENTS.md](AGENTS.md).

## License

MIT. See [LICENSE](LICENSE).

---

© 2026 [Singleton Software Development](https://singletonsd.com). All rights reserved.
