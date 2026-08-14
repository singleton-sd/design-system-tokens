# Foundations

Singleton SD token contract for `@singleton-sd/tokens`. Agent/gallery identity copy lives in [DESIGN.md](../DESIGN.md).

## Layers

1. **Primitive (`src/tokens/core.json`)** — raw scales only (color ramps, type, space, radius, motion).
2. **Semantic (`src/tokens/semantic/{light,dark}.json`)** — intent aliases (`color.text.default`, not page names).
3. **Component (`src/tokens/components.json`)** — brand-asset tokens only (logo padding/gap).

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

Do not add page-specific aliases (`hero`, `og`, `linkedin`) here. Products map those locally.

## Sync loop

```text
tokens (values) → yarn build → dist/css, dist/tokens.json, native
                 ↘ Penpot token sets/themes (MCP, connected Brand System file)
assets (SVG/PNG) → Penpot logo components
Penpot usage boards → assets/BRAND.md + export packs
```

Figma is reference-only. Do not treat Tokens Studio as the pipeline.

## Related docs

- Gallery/agent identity: [DESIGN.md](../DESIGN.md)
- Assets operating manual: sibling `../assets/AGENTS.md` and usage rules in `../assets/BRAND.md` (or the GitLab links above)

## Release

`yarn release` / CI `release:ci` as before. `dist` is the published artifact (CSS, SCSS, Tailwind theme, JS, `tokens.json`, iOS, Android, Flutter).

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
