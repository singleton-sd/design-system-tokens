/**
 * Validate built CSS/SCSS token sheets (run after `yarn build`).
 *
 * FAIL if retired `--fg-*` aliases appear.
 * FAIL if `--ssd-shadow-*` / `$ssd-shadow-*` contain leaked `dropShadow`.
 * FAIL if composite typography is malformed (nested var in font-size,
 * quoted var(), or CSS var() inside the SCSS export).
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();

/** Package CSS exports plus `:root` sheets consumers import. */
const CSS_SHEETS = [
  'dist/css/light.css',
  'dist/css/dark.css',
  'dist/css/root/light/_variables.css',
  'dist/css/root/dark/_variables.css',
];

const SCSS_SHEETS = [
  'dist/scss/_light.scss',
  'dist/scss/_dark.scss',
  'dist/scss/light/_variables.scss',
  'dist/scss/dark/_variables.scss',
];

const REQUIRED_CSS_DECLS = [
  '--ssd-color-text-default',
  '--ssd-color-text-on-brand',
  '--ssd-color-text-link-hover',
  '--ssd-color-text-inverse-subtle',
  '--ssd-color-border-control',
  '--ssd-color-background-brand-pressed',
  '--ssd-border-width-focus-offset',
  '--ssd-typography-body',
  '--ssd-shadow-sm',
];

const REQUIRED_SCSS_DECLS = REQUIRED_CSS_DECLS.map((name) => name.replace(/^--/, '$'));

const FG_ALIAS_RE = /--fg-[A-Za-z0-9-]+/g;
const CSS_CUSTOM_PROP_RE = /(--[A-Za-z0-9-]+)\s*:\s*([^;]*);/g;
const SCSS_VAR_RE = /(\$[A-Za-z0-9-]+)\s*:\s*([^;]*);/g;
const SHADOW_CSS_NAME_RE = /^--ssd-shadow-/;
const SHADOW_SCSS_NAME_RE = /^\$ssd-shadow-/;
const TYPOGRAPHY_CSS_NAME_RE = /^--ssd-typography-/;
const TYPOGRAPHY_SCSS_NAME_RE = /^\$ssd-typography-/;
const DROP_SHADOW_FRAGMENT_RE = /dropShadow/;
const QUOTED_VAR_RE = /['"]var\(--/;
const NESTED_FONT_SIZE_VAR_RE = /--ssd-font-size-\d+var\(/;
const SCSS_CSS_VAR_RE = /var\(--ssd-/;
const SCSS_DIVISION_RE = /\$ssd-font-size-\d+\s*\/\s*\$ssd-line-height-/;

/**
 * @param {string} relativePath
 * @returns {{ relativePath: string, source?: string, error?: string }}
 */
function loadSheet(relativePath) {
  const absolute = resolve(ROOT, relativePath);
  if (!existsSync(absolute)) {
    return { relativePath, error: 'missing (run yarn build first)' };
  }
  return { relativePath, source: readFileSync(absolute, 'utf8') };
}

/**
 * @param {string} source
 * @returns {string[]}
 */
function findFgAliases(source) {
  return [...new Set(source.match(FG_ALIAS_RE) ?? [])];
}

/**
 * @param {string} source
 * @param {RegExp} pattern
 * @returns {{ name: string, value: string }[]}
 */
function findDecls(source, pattern) {
  /** @type {{ name: string, value: string }[]} */
  const decls = [];
  const re = new RegExp(pattern.source, pattern.flags);
  let match = re.exec(source);
  while (match !== null) {
    decls.push({ name: match[1], value: match[2].trim() });
    match = re.exec(source);
  }
  return decls;
}

let failed = false;

/**
 * @param {string} relativePath
 * @param {{ name: string, value: string }[]} decls
 * @param {readonly string[]} required
 * @param {'css' | 'scss'} syntax
 */
function validateSheet(relativePath, decls, required, syntax) {
  const names = new Set(decls.map((decl) => decl.name));
  for (const name of required) {
    if (!names.has(name)) {
      console.error(`FAIL: ${relativePath}: missing ${name}`);
      failed = true;
    }
  }

  const shadowNameRe = syntax === 'scss' ? SHADOW_SCSS_NAME_RE : SHADOW_CSS_NAME_RE;
  const typographyNameRe = syntax === 'scss' ? TYPOGRAPHY_SCSS_NAME_RE : TYPOGRAPHY_CSS_NAME_RE;

  for (const { name, value } of decls) {
    if (shadowNameRe.test(name) && DROP_SHADOW_FRAGMENT_RE.test(value)) {
      console.error(
        `FAIL: ${relativePath}: ${name} contains invalid dropShadow fragment (DS-78): ${value}`,
      );
      failed = true;
    }

    if (!typographyNameRe.test(name)) {
      continue;
    }
    if (QUOTED_VAR_RE.test(value) || NESTED_FONT_SIZE_VAR_RE.test(value)) {
      console.error(`FAIL: ${relativePath}: ${name} is malformed typography CSS: ${value}`);
      failed = true;
    }
    if (syntax === 'scss' && SCSS_CSS_VAR_RE.test(value)) {
      console.error(
        `FAIL: ${relativePath}: ${name} uses CSS var() in the SCSS export: ${value}`,
      );
      failed = true;
    }
    if (syntax === 'scss' && SCSS_DIVISION_RE.test(value)) {
      console.error(
        `FAIL: ${relativePath}: ${name} uses Sass division for font size/line-height: ${value}`,
      );
      failed = true;
    }
  }
}

for (const relativePath of CSS_SHEETS) {
  const sheet = loadSheet(relativePath);
  if (sheet.error) {
    console.error(`FAIL: ${relativePath}: ${sheet.error}`);
    failed = true;
    continue;
  }
  const source = /** @type {string} */ (sheet.source);
  for (const alias of findFgAliases(source)) {
    console.error(`FAIL: ${relativePath}: retired alias ${alias}`);
    failed = true;
  }
  validateSheet(relativePath, findDecls(source, CSS_CUSTOM_PROP_RE), REQUIRED_CSS_DECLS, 'css');
}

for (const relativePath of SCSS_SHEETS) {
  const sheet = loadSheet(relativePath);
  if (sheet.error) {
    console.error(`FAIL: ${relativePath}: ${sheet.error}`);
    failed = true;
    continue;
  }
  const source = /** @type {string} */ (sheet.source);
  validateSheet(relativePath, findDecls(source, SCSS_VAR_RE), REQUIRED_SCSS_DECLS, 'scss');
}

if (failed) {
  process.exit(1);
}

console.info('CSS/SCSS validation passed.');
