# DESIGN.md

Self-contained design context for agents working on **Singleton SD Design Tokens**.

Do not invent product names, features, colors, scales, copy, or claims beyond what is listed here. Prefer these exact labels and values in any UI, docs, or generated surfaces.

Values live in `src/tokens/` (DTCG `$value` / `$type`). This file is the agent/gallery contract. The operating manual is [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md).

Related:

- Token contract: [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md)
- Public gallery: https://tokens.design.singletonsd.com/
- Logo binaries: `@singleton-sd/assets` — https://assets.singletonsd.com · [AGENTS.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/AGENTS.md) · [BRAND.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/BRAND.md)

---

## Product

| Field | Value |
| --- | --- |
| Product name | Singleton SD - Design System - Tokens |
| Short name | Singleton SD Design Tokens |
| Design system | Singleton SD Design System |
| Brand | Singleton SD |
| Company | Singleton Software Development |
| Package | `@singleton-sd/tokens` |
| Version (at writing) | 1.3.0 |
| License | MIT |
| Support email | support@singletonsd.com |
| Company site | https://singletonsd.com |
| Primary gallery | https://tokens.design.singletonsd.com/ |
| GitLab Pages gallery | https://singleton-sd.gitlab.io/design-system/tokens/ |
| Repository | https://gitlab.com/singleton-sd/design-system/tokens |
| DTCG JSON | https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json |
| Style-guide home | Penpot file `Singleton SD — Brand System` |
| Logo binaries | `@singleton-sd/assets` — https://assets.singletonsd.com |

### Tagline / descriptions (use as-is)

**Short description:**

> This package contains the official design tokens used across Singleton SD projects. It provides a single source of truth for spacing, typography, scales, and theme values, ensuring visual consistency across platforms and tools.

**Package description:**

> Singleton SD's cross-platform design tokens for consistent UI spacing, typography, and theming. Distributed as an npm package and raw JSON for design tools and applications.

**Gallery title:** Singleton SD Design Tokens

**Gallery eyebrow:** Singleton SD Design System

**Gallery H1:** Public design tokens

**Gallery lead:**

> A browser-friendly reference for Singleton SD tokens. Switch between light and dark mode, inspect semantic theme values, and copy the CSS variable names used by applications.

**Gallery meta description:**

> Public reference for Singleton SD design tokens, light and dark themes, color palettes, and CSS variable usage.

### What this product is

A **token distribution package** — not a component library.

Tokens are ready to be consumed by:

- Frontend frameworks (React, Tailwind, CSS)
- Penpot (via `dist/tokens.json`)
- Native apps (generated iOS Swift, Android XML, Flutter Dart constants)
- Any product needing consistent, scalable UI design foundations

Figma is reference-only. Do not treat Tokens Studio as the pipeline. Do not embed logo binaries here.

### Goals

1. One source of truth for spacing, typography, scales, and theme values.
2. Cross-platform outputs: CSS (`data-theme` and `:root`), SCSS, Tailwind theme, JS, DTCG JSON, iOS, Android, Flutter.
3. Light and dark share the same semantic token names while swapping values.
4. Versioned delivery (SemVer) with CDN/Pages paths for latest, tags, and branch previews.
5. A public browser gallery for inspecting semantic colors, core palettes, and CSS variable names.

---

## What should dominate any UI

Lead with the **consumable token catalog**, especially **semantic light/dark color tokens**. Establish that weight before secondary content.

**Dominant:** Semantic theme tokens (`--ssd-color-text-*`, `--ssd-color-background-*`, `--ssd-color-border-*`) and `data-theme` switching.

**Secondary:** Core color scales (CSS variable name + hex).

**Tertiary:** Implementation / consumption examples.

### Gallery section order and labels

1. **Theme modes** → **Semantic color tokens** (Light mode / Dark mode)
2. **Main colors** → **Core palette and color codes**
3. **Implementation** → **Use the tokens in code**

### Gallery CTAs and chrome labels

Explore colors · Light CSS · Dark CSS · Git repository · Theme modes · Light mode · Dark mode · Main colors · Implementation

### Gallery explanatory copy

> Light and dark modes share token names while swapping values. Apps can import both theme files and set `data-theme="light"` or `data-theme="dark"` on the document.

> These foundational color scales power the semantic theme tokens. Each swatch shows the CSS variable name and the resolved color code from the published token CSS.

> Import the generated CSS files from GitLab Pages or the npm package, then style with the stable custom property names.

---

## Native product shape

Organize surfaces as a **catalog + theme pairing + consume path**, not a dashboard, timeline, or generic marketing template.

Conceptual flow:

```
core palette + type + spacing
  → light / dark semantic themes
  → published CSS / SCSS / Tailwind / JS / JSON / iOS / Android / Flutter
  → apps set data-theme and use var(--ssd-…)
```

Token set order:

1. core
2. semantic/light
3. semantic/dark
4. components

CSS prefix is `--ssd-`. Do not reintroduce `--fg-*`, `--bg-*`, or `--accent-*` aliases.

Penpot → tokens → assets sync:

```text
tokens (values) → yarn build → dist/css, dist/css-vars, dist/tokens.json, native
                 ↘ Penpot token sets/themes (MCP, connected Brand System file)
assets (SVG/PNG) → Penpot logo components
Penpot usage boards → assets/BRAND.md + export packs
```

Figma is reference-only. Do not treat Tokens Studio as the pipeline.

---

## Consumption (exact terminology)

### Install

```bash
npm install @singleton-sd/tokens
```

```bash
yarn add @singleton-sd/tokens
```

Registry note: configure npm for the `@singleton-sd` scope via GitLab’s npm registry:

```ini
@singleton-sd:registry=https://gitlab.com/api/v4/packages/npm/
```

### Package entry points

- `@singleton-sd/tokens/css/light`
- `@singleton-sd/tokens/css/dark`
- `@singleton-sd/tokens/css/root/light`
- `@singleton-sd/tokens/css/root/dark`
- `@singleton-sd/tokens/scss`
- `@singleton-sd/tokens/scss/light`
- `@singleton-sd/tokens/scss/dark`
- `@singleton-sd/tokens/css-vars`
- `@singleton-sd/tokens/tailwind`
- `@singleton-sd/tokens/js`
- `@singleton-sd/tokens/tokens.json`

Native files are under `dist/ios/`, `dist/android/`, `dist/flutter/` (token constants only).

### Theme activation

```html
<html data-theme="light">
```

```html
<html data-theme="dark">
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

### Documented CSS usage

```css
body {
  background-color: var(--ssd-color-background-default);
  color: var(--ssd-color-text-default);
  transition:
    background-color var(--ssd-motion-duration-default),
    color var(--ssd-motion-duration-default);
}

.button {
  background: var(--ssd-color-background-brand);
  color: var(--ssd-color-text-on-brand);
}

.button:hover {
  background: var(--ssd-color-background-brand-hovered);
}

.button:active {
  background: var(--ssd-color-background-brand-pressed);
}
```

Old `--fg-*` / `--bg-*` / `--accent-*` names are retired. See [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md) for the migration table.

### Documented CDN / Pages URLs

GitLab free tier has one Pages deployment (no `/1.x.y/` or `/feature-name/` CSS trees). Live URLs track `main`:

```
https://tokens.design.singletonsd.com/css/light.css
https://tokens.design.singletonsd.com/css/dark.css
https://tokens.design.singletonsd.com/css/root/light/_variables.css
https://singleton-sd.gitlab.io/design-system/tokens/css/dark.css
```

Pin production CSS with `@singleton-sd/tokens@x.y.z` package exports, not a versioned Pages path.

| Use case | Where | Description |
| --- | --- | --- |
| Live gallery / CDN | `/css/…` | Latest from `main` |
| Production lock | npm `./css/*` exports | Pinned package version |

---

## Visual identity

### Typeface

- Heading: **Open Sauce Sans** (`--ssd-font-family-heading`)
- Body: **Open Sauce Sans** (`--ssd-font-family-body`)
- Mono: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` (`--ssd-font-family-mono`)

### Font sizes

| Token | CSS variable | Value |
| --- | --- | --- |
| 100 | `--ssd-font-size-100` | 12px |
| 200 | `--ssd-font-size-200` | 14px |
| 300 | `--ssd-font-size-300` | 16px |
| 400 | `--ssd-font-size-400` | 26px |
| 500 | `--ssd-font-size-500` | 36px |
| 600 | `--ssd-font-size-600` | 42px |
| 700 | `--ssd-font-size-700` | 52px |

Display / h1 sizes are on the typography composites (72px / 64px), not extra primitive steps.

### Font weights

| Token | CSS variable | Value |
| --- | --- | --- |
| regular | `--ssd-font-weight-regular` | 400 |
| medium | `--ssd-font-weight-medium` | 500 |
| semibold | `--ssd-font-weight-semibold` | 600 |
| bold | `--ssd-font-weight-bold` | 700 |

### Letter spacing & line height

| Token | CSS variable | Value |
| --- | --- | --- |
| letterSpacing.default | `--ssd-letter-spacing-default` | 0 |
| letterSpacing.heading | `--ssd-letter-spacing-heading` | -0.03em |
| lineHeight.heading | `--ssd-line-height-heading` | 1 |
| lineHeight.body | `--ssd-line-height-body` | 1.5 |

### Composite typography styles

| Style | Family | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| display | heading | bold (700) | 72px | heading (1) | heading |
| h1 | heading | bold (700) | 64px | heading (1) | heading |
| h2 | heading | bold (700) | size.700 (52px) | heading (1) | heading |
| h3 | heading | semibold (600) | size.600 (42px) | heading (1) | heading |
| body | body | regular (400) | size.300 (16px) | body (1.5) | default |
| body-sm | body | regular (400) | size.200 (14px) | body (1.5) | default |
| caption | body | medium (500) | size.100 (12px) | body (1.5) | default |
| legal | body | regular (400) | size.100 (12px) | body (1.5) | default |

### Spacing

| Token | CSS variable | Value |
| --- | --- | --- |
| 100 | `--ssd-space-100` | 4px |
| 200 | `--ssd-space-200` | 8px |
| 300 | `--ssd-space-300` | 16px |
| 400 | `--ssd-space-400` | 24px |
| 500 | `--ssd-space-500` | 32px |
| 600 | `--ssd-space-600` | 48px |
| 800 | `--ssd-space-800` | 64px |

### Radius

| Token | CSS variable | Value |
| --- | --- | --- |
| sm | `--ssd-radius-sm` | 4px |
| md | `--ssd-radius-md` | 8px |
| lg | `--ssd-radius-lg` | 12px |
| xl | `--ssd-radius-xl` | 16px |
| full | `--ssd-radius-full` | 9999px |

### Border width

| Token | CSS variable | Value |
| --- | --- | --- |
| default | `--ssd-border-width-default` | 1px |
| strong | `--ssd-border-width-strong` | 2px |
| focus-offset | `--ssd-border-width-focus-offset` | 2px |

### Motion

| Token | CSS variable | Value |
| --- | --- | --- |
| fast | `--ssd-motion-duration-fast` | 150ms |
| default | `--ssd-motion-duration-default` | 300ms |
| slow | `--ssd-motion-duration-slow` | 500ms |

### Component tokens (logo)

| Token | Value |
| --- | --- |
| logo.layout.padding.horizontal | space.300 (16px) |
| logo.layout.padding.vertical | space.300 (16px) |
| logo.layout.gap | space.100 (4px) |

---

## Core color palette

Use these exact hex values. CSS custom properties use the `--ssd-color-{name}-{step}` form (or `--ssd-color-black` / `--ssd-color-white`).

### Neutrals

| Token | Hex |
| --- | --- |
| black | `#000000` |
| white | `#ffffff` |

### gray

| Step | Hex |
| --- | --- |
| 100 | `#f5f6f7` |
| 200 | `#e1e3e6` |
| 300 | `#c9ccd1` |
| 400 | `#b3b7bd` |
| 500 | `#9da1a6` |
| 600 | `#7f848a` |
| 700 | `#60656b` |
| 800 | `#44484d` |
| 900 | `#292c30` |

### red

| Step | Hex |
| --- | --- |
| 100 | `#fff5f5` |
| 200 | `#fed7d7` |
| 300 | `#feb2b2` |
| 400 | `#fc8181` |
| 500 | `#f56565` |
| 600 | `#e53e3e` |
| 700 | `#c53030` |
| 800 | `#9b2c2c` |
| 900 | `#742a2a` |

### orange

| Step | Hex |
| --- | --- |
| 100 | `#fffaf0` |
| 200 | `#feebc8` |
| 300 | `#fbd38d` |
| 400 | `#f6ad55` |
| 500 | `#ed8936` |
| 600 | `#dd6b20` |
| 700 | `#c05621` |
| 800 | `#9c4221` |
| 900 | `#7b341e` |

### yellow-light (brand on light surfaces)

| Step | Hex |
| --- | --- |
| 100 | `#fff7e2` |
| 200 | `#ffe8b5` |
| 300 | `#ffd980` |
| 400 | `#fdc94a` |
| 500 | `#c89200` |
| 600 | `#b57f00` |
| 700 | `#a36f00` |
| 800 | `#8e5c00` |
| 900 | `#6b4500` |

### yellow-dark (brand on dark surfaces)

| Step | Hex |
| --- | --- |
| 100 | `#fff8e1` |
| 200 | `#ffecb3` |
| 300 | `#ffe082` |
| 400 | `#ffd54f` |
| 500 | `#ffb300` |
| 600 | `#ffa000` |
| 700 | `#ff8f00` |
| 800 | `#ff6f00` |
| 900 | `#e65100` |

### green

| Step | Hex |
| --- | --- |
| 100 | `#f0fff4` |
| 200 | `#c6f6d5` |
| 300 | `#9ae6b4` |
| 400 | `#68d391` |
| 500 | `#48bb78` |
| 600 | `#38a169` |
| 700 | `#2f855a` |
| 800 | `#276749` |
| 900 | `#22543d` |

### teal

| Step | Hex |
| --- | --- |
| 100 | `#e6fffa` |
| 200 | `#b2f5ea` |
| 300 | `#81e6d9` |
| 400 | `#4fd1c5` |
| 500 | `#38b2ac` |
| 600 | `#319795` |
| 700 | `#2c7a7b` |
| 800 | `#285e61` |
| 900 | `#234e52` |

### blue

| Step | Hex |
| --- | --- |
| 100 | `#ebf8ff` |
| 200 | `#bee3f8` |
| 300 | `#90cdf4` |
| 400 | `#63b3ed` |
| 500 | `#4299e1` |
| 600 | `#3182ce` |
| 700 | `#2b6cb0` |
| 800 | `#2c5282` |
| 900 | `#2a4365` |

### indigo

Kept as a primitive ramp. There is **no semantic `accent` group**. Brand yellow is `color.*.brand`.

| Step | Hex |
| --- | --- |
| 100 | `#ebf4ff` |
| 200 | `#c3dafe` |
| 300 | `#a3bffa` |
| 400 | `#7f9cf5` |
| 500 | `#667eea` |
| 600 | `#5a67d8` |
| 700 | `#4c51bf` |
| 800 | `#434190` |
| 900 | `#3c366b` |

### purple

| Step | Hex |
| --- | --- |
| 100 | `#f5e8ff` |
| 200 | `#e1cfff` |
| 300 | `#cba8ff` |
| 400 | `#a76eff` |
| 500 | `#8432ff` |
| 600 | `#6d00e0` |
| 700 | `#5a00bf` |
| 800 | `#470099` |
| 900 | `#310066` |

### pink

| Step | Hex |
| --- | --- |
| 100 | `#fff5f7` |
| 200 | `#fed7e2` |
| 300 | `#fbb6ce` |
| 400 | `#f687b3` |
| 500 | `#ed64a6` |
| 600 | `#d53f8c` |
| 700 | `#b83280` |
| 800 | `#97266d` |
| 900 | `#702459` |

---

## Semantic theme tokens

Same CSS custom property names in both themes; values differ. Activate with `data-theme="light"` or `data-theme="dark"`.

### Light

| CSS variable | Resolves to | Hex |
| --- | --- | --- |
| `--ssd-color-text-default` | gray 900 | `#292c30` |
| `--ssd-color-text-muted` | gray 700 | `#60656b` |
| `--ssd-color-text-subtle` | gray 700 | `#60656b` |
| `--ssd-color-text-disabled` | gray 400 | `#b3b7bd` |
| `--ssd-color-text-inverse` | white | `#ffffff` |
| `--ssd-color-text-brand` | yellow-light 500 | `#c89200` |
| `--ssd-color-text-on-brand` | black | `#000000` |
| `--ssd-color-text-link` | yellow-light 800 | `#8e5c00` |
| `--ssd-color-text-link-hover` | yellow-light 900 | `#6b4500` |
| `--ssd-color-background-default` | white | `#ffffff` |
| `--ssd-color-background-muted` | gray 100 | `#f5f6f7` |
| `--ssd-color-background-subtle` | gray 200 | `#e1e3e6` |
| `--ssd-color-background-inverse` | black | `#000000` |
| `--ssd-color-background-brand` | yellow-light 500 | `#c89200` |
| `--ssd-color-background-brand-hovered` | yellow-light 600 | `#b57f00` |
| `--ssd-color-background-brand-pressed` | yellow-light 700 | `#a36f00` |
| `--ssd-color-border-default` | gray 300 | `#c9ccd1` |
| `--ssd-color-border-muted` | gray 200 | `#e1e3e6` |
| `--ssd-color-border-strong` | gray 500 | `#9da1a6` |
| `--ssd-color-border-control` | gray 600 | `#7f848a` |
| `--ssd-color-border-focus` | gray 900 | `#292c30` |
| `--ssd-color-border-brand` | yellow-light 500 | `#c89200` |
| `--ssd-color-icon-default` | text.default | `#292c30` |
| `--ssd-color-icon-muted` | text.muted | `#60656b` |
| `--ssd-color-icon-inverse` | text.inverse | `#ffffff` |
| `--ssd-color-icon-brand` | text.brand | `#c89200` |
| `--ssd-color-feedback-danger-text` | red 700 | `#c53030` |
| `--ssd-color-feedback-danger-background` | red 100 | `#fff5f5` |
| `--ssd-color-feedback-danger-border` | red 400 | `#fc8181` |
| `--ssd-color-feedback-warning-text` | orange 700 | `#c05621` |
| `--ssd-color-feedback-warning-background` | orange 100 | `#fffaf0` |
| `--ssd-color-feedback-warning-border` | orange 400 | `#f6ad55` |
| `--ssd-color-feedback-success-text` | green 700 | `#2f855a` |
| `--ssd-color-feedback-success-background` | green 100 | `#f0fff4` |
| `--ssd-color-feedback-success-border` | green 400 | `#68d391` |
| `--ssd-color-feedback-info-text` | blue 700 | `#2b6cb0` |
| `--ssd-color-feedback-info-background` | blue 100 | `#ebf8ff` |
| `--ssd-color-feedback-info-border` | blue 400 | `#63b3ed` |

### Dark

| CSS variable | Resolves to | Hex |
| --- | --- | --- |
| `--ssd-color-text-default` | gray 100 | `#f5f6f7` |
| `--ssd-color-text-muted` | gray 400 | `#b3b7bd` |
| `--ssd-color-text-subtle` | gray 400 | `#b3b7bd` |
| `--ssd-color-text-disabled` | gray 600 | `#7f848a` |
| `--ssd-color-text-inverse` | gray 900 | `#292c30` |
| `--ssd-color-text-brand` | yellow-dark 500 | `#ffb300` |
| `--ssd-color-text-on-brand` | gray 900 | `#292c30` |
| `--ssd-color-text-link` | yellow-dark 400 | `#ffd54f` |
| `--ssd-color-text-link-hover` | yellow-dark 300 | `#ffe082` |
| `--ssd-color-background-default` | black | `#000000` |
| `--ssd-color-background-muted` | gray 900 | `#292c30` |
| `--ssd-color-background-subtle` | gray 800 | `#44484d` |
| `--ssd-color-background-inverse` | white | `#ffffff` |
| `--ssd-color-background-brand` | yellow-dark 500 | `#ffb300` |
| `--ssd-color-background-brand-hovered` | yellow-dark 400 | `#ffd54f` |
| `--ssd-color-background-brand-pressed` | yellow-dark 600 | `#ffa000` |
| `--ssd-color-border-default` | gray 700 | `#60656b` |
| `--ssd-color-border-muted` | gray 800 | `#44484d` |
| `--ssd-color-border-strong` | gray 500 | `#9da1a6` |
| `--ssd-color-border-control` | gray 500 | `#9da1a6` |
| `--ssd-color-border-focus` | yellow-dark 500 | `#ffb300` |
| `--ssd-color-border-brand` | yellow-dark 500 | `#ffb300` |
| `--ssd-color-icon-default` | text.default | `#f5f6f7` |
| `--ssd-color-icon-muted` | text.muted | `#b3b7bd` |
| `--ssd-color-icon-inverse` | text.inverse | `#292c30` |
| `--ssd-color-icon-brand` | text.brand | `#ffb300` |
| `--ssd-color-feedback-danger-text` | red 300 | `#feb2b2` |
| `--ssd-color-feedback-danger-background` | red 900 | `#742a2a` |
| `--ssd-color-feedback-danger-border` | red 600 | `#e53e3e` |
| `--ssd-color-feedback-warning-text` | orange 300 | `#fbd38d` |
| `--ssd-color-feedback-warning-background` | orange 900 | `#7b341e` |
| `--ssd-color-feedback-warning-border` | orange 600 | `#dd6b20` |
| `--ssd-color-feedback-success-text` | green 300 | `#9ae6b4` |
| `--ssd-color-feedback-success-background` | green 900 | `#22543d` |
| `--ssd-color-feedback-success-border` | green 600 | `#38a169` |
| `--ssd-color-feedback-info-text` | blue 300 | `#90cdf4` |
| `--ssd-color-feedback-info-background` | blue 900 | `#2a4365` |
| `--ssd-color-feedback-info-border` | blue 600 | `#3182ce` |

Shadows are composite tokens (`--ssd-shadow-sm|md|lg`), not a color named `shadows.default`. CSS emits valid `box-shadow` values (gray-900 or black mixed at 12% / 16% / 20% alpha). Icon roles alias the matching text roles.

`--ssd-color-border-default` is for decorative dividers. Interactive controls use `--ssd-color-border-control`. Light focus rings use `--ssd-color-border-focus` (gray 900) with `--ssd-border-width-focus-offset` (2px). Dark focus stays yellow-dark 500 (`#ffb300`).

`--ssd-typography-*` is a CSS `font` shorthand (`weight size/line-height family`). Letter-spacing is not part of `font`; pair heading styles with `--ssd-letter-spacing-heading`.

Light `text.subtle` uses gray 700 (same as muted). Gray 600 is 3.77:1 on white, which fails WCAG AA for body text. Dark `text.subtle` uses gray 400 (same as muted): gray 500 is 3.54:1 on `background.subtle` (`#44484d`). Light `text.on-brand` is black on brand yellow.

---

## Allowed vocabulary

Use only these product terms when labeling UI:

design tokens · light · dark · `data-theme` · `--ssd-` · text · background · border · control · focus · icon · brand · on-brand · brand-hovered · brand-pressed · link · link-hover · feedback · spacing 100–800 · font size 100–700 · Open Sauce Sans · Style Dictionary · Penpot · Tailwind · SCSS · CSS custom properties · GitLab Pages · CDN · Semantic Versioning · Singleton SD · Singleton Software Development · `@singleton-sd/tokens` · `@singleton-sd/assets`

Do not use: `--fg-*` · `--bg-*` · accent / onAccent · fg-alternative · Tokens Studio · Figma as the live pipeline.

---

## Agent design rules

1. **Self-contained fidelity** — Treat this document as the design source of truth for agents. Do not invent missing tokens, names, or features.
2. **Nothing placeholder** — If a value is not listed here, do not fabricate it for UI.
3. **Inherit the identity** — Use Open Sauce Sans, the spacing scale, semantic `--ssd-color-text` / `--ssd-color-background` / `--ssd-color-background-brand` roles, and the listed hex values.
4. **Lead with what matters** — Semantic light/dark tokens and consumption come before secondary measures or decorative chrome.
5. **Keep the catalog shape** — Structure pages around palette → semantic themes → usage, not unrelated section templates.
6. **Brand weight** — Keep Singleton SD / Singleton SD Design Tokens as the primary naming signal; do not rebrand to a generic “design system” product name.
7. **Logos elsewhere** — Wordmarks and the S-mark live in `@singleton-sd/assets`. Never commit binary logos to this package.
