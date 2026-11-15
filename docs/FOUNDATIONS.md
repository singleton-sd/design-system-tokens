# Foundations

Singleton SD token contract for `@singleton-sd/tokens`. Agent/gallery identity copy lives in [DESIGN.md](../DESIGN.md).

## Layers

1. **Primitive (`src/tokens/core.json`)** — raw scales only (color ramps, type, space, radius, motion).
2. **Semantic (`src/tokens/semantic/{light,dark}.json`)** — intent aliases (`color.text.default`, not page names).
3. **Component (`src/tokens/components.json`)** — brand-asset tokens only (logo padding/gap).
4. **Product overlay (app CSS, not this package)** — local CSS variables or a `[data-product]` block. Products map page-specific names onto `--ssd-*`. Overlays are never published from `@singleton-sd/tokens`.

Source of truth for **values** is this package. Penpot mirrors the same sets/themes for presentation. `@singleton-sd/assets` holds logo binaries — [AGENTS.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/AGENTS.md) and [BRAND.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/BRAND.md). Public gallery: https://tokens.design.singletonsd.com/

## Naming

- Schema: W3C DTCG `$value` / `$type`
- CSS: `--ssd-` + kebab path (`color.text.muted` → `--ssd-color-text-muted`)
- Themes: Style Dictionary builds light and dark; Penpot `TokenTheme` should activate matching sets (`core` + `semantic/light|dark` + `components`)

## How to add a token

1. Edit the matching layer file (primitive vs semantic vs component).
2. Run `yarn build`.
3. If it is a new **role**, add it to both light and dark semantic files.
4. Document consumer impact in this file if the CSS name is public.

Do not add page-specific aliases (`hero`, `og`, `linkedin`) here. Products map those locally. That rule is firm: the tokens package ships shared brand roles only. Product overlays stay in the consuming app.

## Product overlays

Core brand is `--ssd-*`. Each product may add a **local overlay** for names this package will not ship.

Put overlays in app CSS as:

- Product-prefixed locals on the theme root (`[data-theme='light']` / `[data-theme='dark']`), applied to the `<html>` element or your app-shell root, or
- A `[data-product='…']` block on the same root element (or a subtree wrapper) that scopes the same locals to a single product.

### Overlay rules

- Overlay values **must** reference `--ssd-*` (or compositions of them, for example `color-mix`).
- Never introduce `--fg-*`, `--bg-*`, or other pre-migration aliases in an overlay. Remap those in the product ([DS-61](https://app.clickup.com/t/86d4143pg) marketing, [DS-62](https://app.clickup.com/t/86d4143pj) jsonresume-theme-pdf).
- Do not add page-specific aliases (`hero`, `og`, `linkedin`) to this package. Keep them in the product overlay.
- Overlay CSS is **not** a package export. `package.json` `files` is `dist` only. [docs/examples/marketing-overlay.css](examples/marketing-overlay.css) is a commented reference snippet, not a published artifact.

### Marketing reference

Marketing (`apps/marketing/src/styles/global.css`) keeps `--mkt-*` locals on the theme root:

- `--mkt-color-background-hero` — page wash. There is no hero token here; map to `--ssd-color-background-inverse` / `--ssd-color-background-brand`, or mix brand at lower emphasis.
- Shadows — use published `var(--ssd-shadow-sm|md|lg)`. Those now emit valid `box-shadow` ([DS-78](https://app.clickup.com/t/86d41j56h)). Local `--mkt-shadow-*` copies are not required.

Copy the commented snippet in [docs/examples/marketing-overlay.css](examples/marketing-overlay.css). Live catalog: https://tokens.design.singletonsd.com/

## Sync loop

```text
tokens (values) → yarn build → dist/css, dist/css-vars, dist/tokens.json, native
                 ↘ Penpot token sets/themes (MCP, connected Brand System file)
assets (SVG/PNG) → Penpot logo components
Penpot usage boards → assets/BRAND.md + export packs
```

The Figma Brand Style Guide and Phases 1–6 are deprecated. Do not treat Figma or Tokens Studio as the pipeline. See [FIGMA-DEPRECATED.md](FIGMA-DEPRECATED.md).

## Accessibility (WCAG AA)

Semantic text, focus, and control colours target **4.5:1** for body text and **3:1** for UI boundaries / focus.

| Pair | Hex on surface | Ratio | Role |
| --- | --- | --- | --- |
| Light `text.default` gray-900 on white | `#292c30` on `#ffffff` | 14.03:1 | Body text |
| Light `text.muted` / `text.subtle` gray-700 on white | `#60656b` on `#ffffff` | 5.88:1 | Secondary text |
| Light gray-600 on white | `#7f848a` on `#ffffff` | 3.77:1 | **Not** used for text. Fails 4.5:1; used as `border.control` |
| Light `text.link` yellow-light-800 on white | `#8e5c00` on `#ffffff` | 5.70:1 | Links |
| Light `text.link-hover` yellow-light-900 on white | `#6b4500` on `#ffffff` | 8.48:1 | Link hover |
| Light `text.inverse-subtle` yellow-dark-300 on `background.inverse` | `#ffe082` on `#000000` | 16.24:1 | Muted text on inverse blocks |
| Light `text.subtle` gray-700 on `background.inverse` | `#60656b` on `#000000` | 3.57:1 | **Not** for text. Use `text.inverse-subtle` |
| Light `text.on-brand` black on brand | `#000000` on `#c89200` | 7.57:1 | Primary button label |
| Light `text.on-brand` black on brand-hovered | `#000000` on `#b57f00` | 6.00:1 | Hovered button label |
| Light `text.on-brand` black on brand-pressed | `#000000` on `#a36f00` | 4.83:1 | Pressed button label |
| Dark `text.default` gray-100 on black | `#f5f6f7` on `#000000` | 19.41:1 | Body text |
| Dark `text.muted` / `text.subtle` gray-400 on black | `#b3b7bd` on `#000000` | 10.42:1 | Secondary / tertiary text |
| Dark `text.subtle` gray-400 on `background.subtle` | `#b3b7bd` on `#44484d` | 4.57:1 | Tertiary text on muted surfaces |
| Dark `text.inverse-subtle` gray-700 on `background.inverse` | `#60656b` on `#ffffff` | 5.88:1 | Muted text on inverse blocks |
| Dark `text.link` yellow-dark-400 on black | `#ffd54f` on `#000000` | 14.88:1 | Links (kept) |
| Light `border.control` gray-600 on white | `#7f848a` on `#ffffff` | 3.77:1 | Control outline |
| Light `border.focus` gray-900 on white | `#292c30` on `#ffffff` | 14.03:1 | Focus ring |

`text.subtle` (light) is **gray-700**, not gray-600: 3.77:1 is enough for UI chrome but not for body-sized text. Dark `text.subtle` is **gray-400** (same as muted): gray-500 is 3.54:1 on `background.subtle` (`#44484d`).

`border.default` stays a decorative divider (gray-300 light / gray-700 dark). Interactive controls use `border.control`. Focus offset is `--ssd-border-width-focus-offset` (2px) in the existing `border.width` group.

`--ssd-typography-*` is a CSS `font` shorthand with token references. `--ssd-shadow-*` is a CSS `box-shadow` value using `color-mix` at 12% / 16% / 20% (sm / md / lg).

## Related docs

- Gallery/agent identity: [DESIGN.md](../DESIGN.md)
- Product overlay example (not published): [examples/marketing-overlay.css](examples/marketing-overlay.css)
- Assets operating manual: sibling `../assets/AGENTS.md` and usage rules in `../assets/BRAND.md` (or the GitLab links above)

## Release

`yarn release` / CI `release:ci` as before. `dist` is the published artifact (CSS, SCSS, css-vars map, Tailwind theme, JS, `tokens.json`, iOS, Android, Flutter).

## Old → new CSS migration

Clean break: no `--fg-*` aliases in this package. Consumers remap in follow-up PRs ([DS-61](https://app.clickup.com/t/86d4143pg) marketing, [DS-62](https://app.clickup.com/t/86d4143pj) jsonresume-theme-pdf).

| Today | New |
| --- | --- |
| `--fg-default` | `--ssd-color-text-default` |
| `--fg-muted` | `--ssd-color-text-muted` |
| `--fg-subtle` | `--ssd-color-text-subtle` |
| `--fg-inverse` | `--ssd-color-text-inverse` |
| `--fg-brand` | `--ssd-color-text-brand` |
| `--bg-default` | `--ssd-color-background-default` |
| `--bg-muted` | `--ssd-color-background-muted` |
| `--bg-subtle` | `--ssd-color-background-subtle` |
| `--bg-inverse` | `--ssd-color-background-inverse` |
| `--bg-hero` | `--ssd-color-background-inverse` or `--ssd-color-background-brand` (no hero token) |
| `--accent-default` | `--ssd-color-background-brand` |
| `--accent-hover` | `--ssd-color-background-brand-hovered` |
| `--accent-on-accent` | `--ssd-color-text-on-brand` |
| `--accent-bg` / `--accent-muted` | `--ssd-color-background-muted` or brand at lower emphasis |
| `--border-*` | `--ssd-color-border-*` |
| `--status-error` / `--status-error-bg` | `--ssd-color-feedback-danger-text` / `--ssd-color-feedback-danger-background` |
| `--status-success*` | `--ssd-color-feedback-success-*` |
| `--shadow-*` | `--ssd-shadow-*` |
| `--font-families-heading` / `--font-families-body` | `--ssd-font-family-heading` / `--ssd-font-family-body` |
| `--colors-*` | `--ssd-color-*` |

Brand yellow is `color.*.brand`. There is no parallel `accent` group.

## Figma (deprecated)

The Figma Brand Style Guide and Figma Phases 1–6 (DS-1–DS-28) are superseded.
Canonical sources are Penpot plus this package and `@singleton-sd/assets`. See
[FIGMA-DEPRECATED.md](FIGMA-DEPRECATED.md).

