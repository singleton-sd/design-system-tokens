# Singleton SD - Design System - Tokens

[![Latest Release](https://gitlab.com/singleton-sd/design-system/tokens/-/badges/release.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/releases)
[![pipeline status](https://gitlab.com/singleton-sd/design-system/tokens/badges/master/pipeline.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/commits/master)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Live Token Gallery](https://tokens.design.singletonsd.com/) · [GitLab Pages URL](https://singleton-sd.gitlab.io/design-system/tokens/)

📌 **Short description of the project.**

This package contains the official design tokens used across Singleton SD projects. It provides a single source of truth for spacing, typography, scales, and theme values, ensuring visual consistency across platforms and tools.

Tokens are distributed in platform-agnostic JSON format and built outputs, ready to be consumed by:

- Frontend frameworks (React, Tailwind, MUI, etc.)
- Design tools (e.g. Figma Tokens Studio via raw URL)
- Any product needing consistent, scalable UI design foundations

## Public Token Gallery

The GitLab Pages site publishes a public HTML reference for the generated tokens at both the Singleton SD design tokens domain and the GitLab Pages URL:

- Primary domain: [https://tokens.design.singletonsd.com/](https://tokens.design.singletonsd.com/)
- GitLab Pages fallback: [https://singleton-sd.gitlab.io/design-system/tokens/](https://singleton-sd.gitlab.io/design-system/tokens/)
- Repository: [https://gitlab.com/singleton-sd/design-system/tokens](https://gitlab.com/singleton-sd/design-system/tokens)

The page is built from the generated files in `dist` and demonstrates:

- Light and dark mode with `data-theme="light"` and `data-theme="dark"`
- Semantic theme colors such as `--fg-default`, `--bg-default`, and `--accent-default`
- Main color palettes with their CSS variable names and color codes
- Browser usage examples for the published CSS token files

## 📁 Structure Overview

font/ → Base font sizes and heading scale
dimension/scale/ → Atomic spacing units based on font.base
spacing/ → Semantic spacing references (xs–xxl)

## 🚀 Usage

### NPM

```bash
npm install @singletonsd/tokens
```

### URL (e.g. for Figma)

[https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json](https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json)

## 📦 Installation

Make sure you configure your npm registry to use the GitLab registry for `@singleton-sd` packages. To do so, create or update your `.npmrc` file in the root of your project with the following line:

```ini
@singleton-sd:registry=https://gitlab.com/api/v4/packages/npm/
This tells npm to fetch any @singleton-sd scoped packages from GitLab’s npm registry.
```

### **Using NPM**

```sh
npm install @singleton-sd/tokens
```

### **Using Yarn**

```sh
yarn add @singleton-sd/tokens
```

## 🧑‍💻 Usage

### SCSS (recommended for design systems or apps using Sass)

```bash
// Light theme
@use '@singleton-sd/tokens/scss/light' as tokens;

// Dark theme
@use '@singleton-sd/tokens/scss/dark' as tokens;
```

You can now use the variables as:

```css
body {
  background-color: tokens.$background;
  color: tokens.$text;
}
```

⚠️ Note: The exact variable names depend on how your SCSS files are structured (e.g. $color-primary, $font-size-sm, etc).

### CSS (for plain CSS or PostCSS setups)

#### Option 1: Dynamic Theming via data-theme

```css
/* Light theme */
@import '@singleton-sd/tokens/css/light';

/* Dark theme */
@import '@singleton-sd/tokens/css/dark';
```

Now you can use CSS custom properties:

```css
body {
  background-color: var(--bg-default);
  color: var(--fg-default);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
```

To activate a theme, apply the `data-theme` attribute to the `html` or `body` element:

```html
<html data-theme="dark">
  <!-- or "light" -->
  <body>
    ...
  </body>
</html>
```

Or toggle it dynamically:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

#### Option 2: Static Theming via :root (no theme switcher)

If you are not using data-theme, and just want to apply tokens globally via :root, import the corresponding root files:

```css
/* Light theme as default (applied globally to :root) */
@import '@singleton-sd/tokens/css/root/light';

/* Optional: override with dark tokens if system prefers dark mode */
@import '@singleton-sd/tokens/css/root/dark';
```

This will expose the tokens directly to :root without requiring a data-theme attribute.

Use as usual:

```css
body {
  background-color: var(--bg-default);
  color: var(--fg-default);
}
```

### 📦 Via CDN

This project publishes versioned CSS design tokens via GitLab Pages, enabling stable, branch-specific, or tag-specific consumption.

You can include the tokens directly in your application via the public tokens domain. The GitLab Pages URL is also available as a fallback.

#### CSS Import Examples

📌 Latest (from main)

```css
@import url('https://tokens.design.singletonsd.com/css/dark/_variables.css');
@import url('https://singleton-sd.gitlab.io/design-system/tokens/css/dark/_variables.css');
```

🏷 Specific Version (from Git Tag)

```css
@import url('https://tokens.design.singletonsd.com/1.2.1/css/dark/_variables.css');
@import url('https://singleton-sd.gitlab.io/design-system/tokens/1.2.1/css/dark/_variables.css');
```

🌿 Feature or Branch
GitLab sanitizes branch names by converting them to lowercase and replacing invalid characters with hyphens. For example, for a branch called feature/dark-mode, use:

```css
@import url('https://tokens.design.singletonsd.com/feature-dark-mode/css/dark/_variables.css');
@import url('https://singleton-sd.gitlab.io/design-system/tokens/feature-dark-mode/css/dark/_variables.css');
```

You can include your CSS design tokens directly into your HTML using GitLab Pages. This is the recommended method for browser-safe, versioned, and production-ready consumption.

#### HTML Link Examples

📌 Latest version (from main branch)

```html
<link
  href="https://tokens.design.singletonsd.com/css/dark/_variables.css"
  rel="stylesheet"
/>
<link
  href="https://singleton-sd.gitlab.io/design-system/tokens/css/dark/_variables.css"
  rel="stylesheet"
/>
```

Use this for live environments where staying up-to-date with the main branch is acceptable.

🏷 Locked version (from Git tag)

```html
<link
  href="https://tokens.design.singletonsd.com/1.2.1/css/dark/_variables.css"
  rel="stylesheet"
/>
<link
  href="https://singleton-sd.gitlab.io/design-system/tokens/1.2.1/css/dark/_variables.css"
  rel="stylesheet"
/>
```

Use this in production to lock your app to a specific version of the tokens.

🌿 Feature or preview branch (e.g., feature/color-tokens)

```html
<link
  href="https://tokens.design.singletonsd.com/feature-color-tokens/css/dark/_variables.css"
  rel="stylesheet"
/>
<link
  href="https://singleton-sd.gitlab.io/design-system/tokens/feature-color-tokens/css/dark/_variables.css"
  rel="stylesheet"
/>
```

GitLab automatically sanitizes branch names: lowercase, non-alphanumeric characters replaced with hyphens.

📌 Recommendation

| Use case        | URL path         | Description                          |
| --------------- | ---------------- | ------------------------------------ |
| Production      | `/1.2.1/`        | Locked to a released tag             |
| Staging / Dev   | `/`              | Latest from `main` branch            |
| Feature testing | `/feature-name/` | Preview from branch (auto-sanitized) |

### Tailwind

After installating, in the consumer's tailwind.config.js:

```js
// tailwind.config.js
const singletonTokens = require('@singleton-sd/tokens/tailwind');

module.exports = {
  ...singletonTokens,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Add your project's paths here
  ],
  theme: {
    ...singletonTokens.theme,
    extend: {
      // Add custom extensions here
    },
  },
};
```

### **Local Development**

Clone the repository and install dependencies:

```sh
git clone https://gitlab.com/singleton-sd/design-system/tokens.git
cd tokens
yarn install
```

## 🔄 Versioning

This project follows [Semantic Versioning](https://semver.org/). Releases are tagged as:

- `1.0.0` - Major release (breaking changes)
- `1.1.0` - Minor release (new features, backward compatible)
- `1.1.1` - Patch release (bug fixes, security updates)

## 🤝 Contributing

👨‍💻 We welcome contributions!

### **Steps to Contribute**

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Create a Merge Request on GitLab.

## 🔧 CI/CD Pipeline

This project uses **GitLab CI/CD** for automated testing and deployment. See the `.gitlab-ci.yml` file for details.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

For questions or support, contact:

- 📧 Email: [support@singletonsd.com](mailto:support@singletonsd.com)
- 🏢 Company: [Singleton Software Development](https://singletonsd.com)

--

© [Singleton Software Development](https://singletonsd.com) - All rights reserved.
