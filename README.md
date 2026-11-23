# @singleton-sd/tokens

Read-only GitHub mirror of Singleton SD's cross-platform design tokens package.

**Source of truth:** [GitLab `singleton-sd/design-system/tokens`](https://gitlab.com/singleton-sd/design-system/tokens). Do not open feature PRs or push feature branches here; ship GitLab merge requests only. This repository exists so `@singleton-sd/tokens` can be published to [GitHub Packages](https://npm.pkg.github.com).

- **Owner:** Software Factory Lead (build)
- **Tracking ticket:** [SSD-1148](https://app.clickup.com/t/14ymjnwbxhe)
- **Package:** `@singleton-sd/tokens` (Node 22, Yarn 1.22.22)

## Build and test

After the GitLab tree has been synced onto `main`:

```bash
yarn install --frozen-lockfile
yarn build-all
yarn test
yarn validate:css
```

GitHub-only files live under `.github/` (sync and publish workflows). They are preserved by merging GitLab `main` into this `main` — never force-push.
