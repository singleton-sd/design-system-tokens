/**
 * Validate built CSS token sheets (run after `yarn build`).
 *
 * FAIL if retired `--fg-*` aliases appear.
 * FAIL if `--ssd-shadow-*` contains leaked `dropShadow` fragments (DS-78).
 * FAIL if composite typography CSS is malformed (nested var in font-size, quoted var()).
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

const REQUIRED_DECLS = [
  '--ssd-color-text-default',
  '--ssd-color-text-link-hover',
  '--ssd-color-border-control',
  '--ssd-border-width-focus-offset',
  '--ssd-typography-body',
  '--ssd-shadow-sm',
];

const FG_ALIAS_RE = /--fg-[A-Za-z0-9-]+/g;
const CUSTOM_PROP_RE = /(--[A-Za-z0-9-]+)\s*:\s*([^;]*);/g;
const SHADOW_NAME_RE = /^--ssd-shadow-/;
const TYPOGRAPHY_NAME_RE = /^--ssd-typography-/;
const DROP_SHADOW_FRAGMENT_RE = /dropShadow/;
const QUOTED_VAR_RE = /['"]var\(--/;
const NESTED_FONT_SIZE_VAR_RE = /--ssd-font-size-\d+var\(/;

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
function findDecls(css) {
  /** @type {{ name: string, value: string }[]} */
  const decls = [];
  CUSTOM_PROP_RE.lastIndex = 0;
  let match = CUSTOM_PROP_RE.exec(css);
  while (match !== null) {
    decls.push({ name: match[1], value: match[2].trim() });
    match = CUSTOM_PROP_RE.exec(css);
  }
  return decls;
}

let failed = false;

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

  const decls = findDecls(css);
  const names = new Set(decls.map((decl) => decl.name));

  for (const required of REQUIRED_DECLS) {
    if (!names.has(required)) {
      console.error(`FAIL: ${relativePath}: missing ${required}`);
      failed = true;
    }
  }

  for (const { name, value } of decls) {
    if (SHADOW_NAME_RE.test(name) && DROP_SHADOW_FRAGMENT_RE.test(value)) {
      console.error(
        `FAIL: ${relativePath}: ${name} contains invalid dropShadow fragment (DS-78): ${value}`,
      );
      failed = true;
    }

    if (TYPOGRAPHY_NAME_RE.test(name)) {
      if (QUOTED_VAR_RE.test(value) || NESTED_FONT_SIZE_VAR_RE.test(value)) {
        console.error(`FAIL: ${relativePath}: ${name} is malformed typography CSS: ${value}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.info('CSS validation passed.');
