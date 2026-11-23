# GitHub mirror of `@singleton-sd/tokens`

GitLab [`singleton-sd/design-system/tokens`](https://gitlab.com/singleton-sd/design-system/tokens) (project `70589530`) is the **source of truth**. This GitHub repository is a **read-only mirror** so `@singleton-sd/tokens` can be published to [GitHub Packages](https://npm.pkg.github.com).

Do not open feature PRs or push feature branches here. Ship GitLab merge requests only.

This file lives under `.github/` so it survives the hourly GitLab → GitHub sync. After the first sync merge, `README.md` is GitLab-owned and must not be edited on GitHub.

## Layout

GitHub `main` is GitLab `main` **plus** a persistent GitHub-only layer under `.github/`:

| Path | Role |
| --- | --- |
| `.github/workflows/sync-from-gitlab.yml` | Hourly (and manual) merge of GitLab into GitHub |
| `.github/workflows/publish.yml` | Publish a tag, or every unpublished local tag, to GitHub Packages |
| `.github/workflows/ci.yml` | actionlint; yarn install/build/test after the GitLab tree exists |
| `.github/MIRROR.md` | This document |

Everything else (`package.json`, `src/`, `dist/`, `yarn.lock`, `README.md`, …) is GitLab-owned. The sync job never commits edits to those files. On conflict it takes GitLab’s version.

## Sync (`sync-from-gitlab.yml`)

Triggers: hourly cron (`0 * * * *`) and `workflow_dispatch`.

1. Fail if `vars.RELEASE_APP_ID` or `secrets.RELEASE_APP_PRIVATE_KEY` is missing. Git pushes use the **singleton-release GitHub App** token only — never `GITHUB_TOKEN`.
2. Fetch the public GitLab remote (`https://gitlab.com/singleton-sd/design-system/tokens.git`). No GitLab token.
3. **`main`:** `git merge --no-commit` GitLab `main` into GitHub `main` (no rebase, no `reset --hard`, no force-push). First run uses `--allow-unrelated-histories` when the histories do not share an ancestor. After the merge, the job restores the complete pre-merge `.github/` tree from GitHub `HEAD`, then commits. That keeps GitHub-only workflows even if GitLab later adds or conflicts on `.github/`. GitLab-owned paths still take GitLab’s version. Push `main` only as that merge (or a no-op if already up to date). If the push is rejected, the job fails.
4. **Other branches** (`design`, `feature/…`): same name on GitHub, **fast-forward only**. `.github/` is not merged into those branches.
5. **Tags:** mirrored as-is (they point at GitLab commits). If a tag already exists at the same SHA, skip it. If it exists at a different SHA, **fail** — never move or overwrite a tag.
6. Exit 0 when nothing is new.

Git HTTPS for App pushes uses Basic `x-access-token` (never Bearer), matching [`singleton-sd/kit-ui` `release.yml`](https://github.com/singleton-sd/kit-ui/blob/main/.github/workflows/release.yml).

## Publish (`publish.yml`)

GitLab tags (`1.1.0` … `1.8.0`, **no `v` prefix**) point at GitLab commits that **do not contain** `.github/workflows`. There is no `on: push: tags` trigger.

Start publish from the default branch:

- `workflow_call` — the sync workflow invokes this for **each newly pushed tag**, with `permissions: { contents: read, packages: write }` granted by the caller.
- `workflow_dispatch` — backfill and retry. Input `tag` is one version (`1.8.0`) or `all` (every local version tag not yet on the registry).

The job checks out the **tag commit**, rebuilds with `yarn build-all` (same as GitLab CI; `dist/` is committed **and** rebuilt), runs `yarn test` / `yarn validate:css` when those scripts exist, and publishes with `GITHUB_TOKEN`. GitHub Packages **rejects** App tokens. `setup-node` does not set `registry-url` or `scope`, so Yarn install/build/test never authenticate to GitHub Packages. The Packages token is passed only as step-level `PKG_TOKEN`, copied into a non-exported shell variable, unset, and supplied inline as `NODE_AUTH_TOKEN` on `npm view` / `npm publish` only.

`package.json` `repository` still points at GitLab. At publish time only (throwaway checkout, not committed) the job sets `repository.url` to this GitHub repo so the package is linked to `singleton-sd/tokens`. `publishConfig` is not committed.

Publishing is idempotent: if `@singleton-sd/tokens@<version>` already exists on `https://npm.pkg.github.com`, that version is skipped and the job exits 0. Never overwrite a published version. Never publish from `main` HEAD (`main` can be docs commits ahead of the latest tag). The tarball always comes from `refs/tags/<version>` (a branch of the same name is not enough). Backfilling an older version uses `npm publish --tag backfill-<version>` (npm rejects SemVer dist-tag names) so an existing higher `latest` (for example 1.8.0) is not moved to 1.1.0.

Backfill tags: `1.1.0`, `1.2.0`, `1.2.1`, `1.2.2`, `1.2.3`, `1.2.4`, `1.2.5`, `1.3.0`, `1.4.0`, `1.4.1`, `1.4.2`, `1.5.0`, `1.6.0`, `1.7.0`, `1.8.0`.

## Operator sequence (after App access is confirmed)

1. Merge the GitHub-only workflows PR to `main`.
2. Run **Sync from GitLab** (`workflow_dispatch`) on `main`. Confirm `main` is a merge of GitLab `main` plus `.github/`, and that GitLab tags exist on GitHub.
3. Sync will call publish for each **new** tag. To backfill or retry: run **Publish** with `tag=all`.
4. Confirm versions on `https://npm.pkg.github.com/@singleton-sd/tokens`.

Do not run sync or publish against production credentials from a cloud agent unless the singleton-release App and org `RELEASE_APP_*` values are confirmed for this repository.
