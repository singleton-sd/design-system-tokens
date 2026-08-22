/**
 * Validate built CSS token sheets (run after `yarn build`).
 *
 * FAIL if retired `--fg-*` aliases appear.
 * WARN if `--ssd-shadow-*` values contain leaked `dropShadow` fragments
 * (known DS-78; keep warn-only until those CSS values are fixed, then fail).
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

const FG_ALIAS_RE = /--fg-[A-Za-z0-9-]+/g;
const CUSTOM_PROP_RE = /(--[A-Za-z0-9-]+)\s*:\s*([^;]*);/g;
const SHADOW_NAME_RE = /^--ssd-shadow-/;
const DROP_SHADOW_FRAGMENT_RE = /dropShadow/;

/**
 * @param {string} relativePath
 * @returns {{ relativePath: string, css?: string, error?: string }}
 */
function loadSheet(relativePath) {
  const absolute = resolve(ROOT, relativePath);
  if (!existsSync(absolute)) {
    return { relativePath, error: 'missing (run yarn build first)' };
  }
  return { relativePath, css: readFileSync(absolute, 'utf8') };
}

/**
 * @param {string} css
 * @returns {string[]}
 */
function findFgAliases(css) {
  return [...new Set(css.match(FG_ALIAS_RE) ?? [])];
}

/**
 * @param {string} css
 * @returns {{ name: string, value: string }[]}
 */
function findShadowDecls(css) {
  /** @type {{ name: string, value: string }[]} */
  const decls = [];
  CUSTOM_PROP_RE.lastIndex = 0;
  let match = CUSTOM_PROP_RE.exec(css);
  while (match !== null) {
    const name = match[1];
    const value = match[2].trim();
    if (SHADOW_NAME_RE.test(name)) {
      decls.push({ name, value });
    }
    match = CUSTOM_PROP_RE.exec(css);
  }
  return decls;
}

let failed = false;
let warningCount = 0;

for (const relativePath of CSS_SHEETS) {
  const sheet = loadSheet(relativePath);
  if (sheet.error) {
    console.error(`FAIL: ${relativePath}: ${sheet.error}`);
    failed = true;
    continue;
  }

  const css = /** @type {string} */ (sheet.css);
  for (const alias of findFgAliases(css)) {
    console.error(`FAIL: ${relativePath}: retired alias ${alias}`);
    failed = true;
  }

  for (const { name, value } of findShadowDecls(css)) {
    if (DROP_SHADOW_FRAGMENT_RE.test(value)) {
      console.warn(
        `WARN: ${relativePath}: ${name} contains invalid dropShadow fragment (DS-78): ${value}`,
      );
      warningCount += 1;
    }
  }
}

if (failed) {
  process.exit(1);
}

if (warningCount > 0) {
  console.info(
    `CSS validation passed with ${warningCount} warning(s) (shadows are warn-only until DS-78).`,
  );
} else {
  console.info('CSS validation passed.');
}
