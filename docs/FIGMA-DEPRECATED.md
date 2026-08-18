# Figma deprecation

The Figma Brand Style Guide and **Figma Phases 1–6** are superseded. They are
historical ClickUp records, not the live design-system pipeline.

Do **not** treat Figma or Tokens Studio as a source of token values, logos, or
style-guide boards. Do not edit the Figma file for new work.

## Canonical sources

| Concern | Home |
| --- | --- |
| Token **values** | this package (`@singleton-sd/tokens`) |
| Style-guide **presentation** | Penpot file *Singleton SD — Brand System* (`3be9e5e1-190f-8090-8008-7ab965968002`) |
| Logo / favicon / OG **binaries** | `@singleton-sd/assets` |
| Public token gallery | https://tokens.design.singletonsd.com/ |
| Shareable brand snapshot | https://assets.singletonsd.com/brand/ |

Operating manuals: [FOUNDATIONS.md](FOUNDATIONS.md) · [AGENTS.md](../AGENTS.md) ·
assets [AGENTS.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/AGENTS.md) ·
assets [BRAND.md](https://gitlab.com/singleton-sd/design-system/assets/-/blob/main/BRAND.md).

## What not to do

- Do not sync tokens through Tokens Studio / Figma Variables.
- Do not re-export logos from Figma when `@singleton-sd/assets` already has SVG/PNG masters.
- Do not point consumers at the Figma Brand Style Guide as the live kit.

Historical Figma file (archive only):
[Singleton SD — Brand Style Guide](https://www.figma.com/design/a2qoGReXgOdaeUsK0pDyEp/Singleton-SD---Brand-Style-Guide).

## Figma Phases 1–6 (closed)

These ClickUp tickets documented the original Figma-first plan. They are already
**complete**. Do not reopen or mass-close them.

| Phase | Tickets | Topic (historical) |
| --- | --- | --- |
| 1 | [DS-1](https://app.clickup.com/t/86d2uc6ga)–[DS-7](https://app.clickup.com/t/86d2uc6jc) | Prompt Claude Design and receive assets |
| 2 | [DS-8](https://app.clickup.com/t/86d2uc6k5)–[DS-12](https://app.clickup.com/t/86d2uc6kv) | Import assets and set up Figma |
| 3 | [DS-13](https://app.clickup.com/t/86d2uc6mu)–[DS-16](https://app.clickup.com/t/86d2uc6nb) | Figma component library |
| 4 | [DS-17](https://app.clickup.com/t/86d2uc6nf)–[DS-19](https://app.clickup.com/t/86d2uc6p1) | Publish Figma library |
| 5 | [DS-20](https://app.clickup.com/t/86d2uc6p5)–[DS-23](https://app.clickup.com/t/86d2uc6pr) | Figma documentation / PDF |
| 6 | [DS-24](https://app.clickup.com/t/86d2uc6pv)–[DS-28](https://app.clickup.com/t/86d2uc6qb) | Dev handoff and testing |

Live work is Penpot + `@singleton-sd/tokens` + `@singleton-sd/assets` (Phase A
onward: [DS-36](https://app.clickup.com/t/86d4143jb) and later).
