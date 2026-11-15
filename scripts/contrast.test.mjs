import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const load = (path) => JSON.parse(readFileSync(new URL(`../src/tokens/${path}`, import.meta.url), 'utf8'));
const core = load('core.json');
const themes = { light: load('semantic/light.json'), dark: load('semantic/dark.json') };

/** Resolve a dotted token path to a hex value, following `{a.b}` references. */
function resolveHex(theme, path) {
  for (const source of [themes[theme], core]) {
    const token = path.split('.').reduce((node, key) => node?.[key], source);
    if (token?.$value === undefined) continue;
    const ref = /^\{(.+)\}$/.exec(token.$value);
    return ref ? resolveHex(theme, ref[1]) : token.$value.toLowerCase();
  }
  throw new Error(`Unknown token ${path} (${theme})`);
}

/** WCAG 2.x relative luminance contrast ratio. */
function contrast(a, b) {
  const luminance = (hex) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('text.inverse-subtle', () => {
  it('leads with yellow on black in light and gray 700 on white in dark', () => {
    assert.equal(resolveHex('light', 'color.text.inverse-subtle'), '#ffe082');
    assert.equal(resolveHex('light', 'color.background.inverse'), '#000000');
    assert.equal(resolveHex('dark', 'color.text.inverse-subtle'), '#60656b');
    assert.equal(resolveHex('dark', 'color.background.inverse'), '#ffffff');
  });

  for (const theme of ['light', 'dark']) {
    it(`meets WCAG AA 4.5:1 on background.inverse (${theme})`, () => {
      for (const text of ['color.text.inverse', 'color.text.inverse-subtle']) {
        const ratio = contrast(resolveHex(theme, text), resolveHex(theme, 'color.background.inverse'));
        assert.ok(ratio >= 4.5, `${text} on background.inverse (${theme}) is ${ratio.toFixed(2)}:1`);
      }
    });
  }

  it('matches the ratios documented in DESIGN.md', () => {
    const ratio = (theme) =>
      contrast(resolveHex(theme, 'color.text.inverse-subtle'), resolveHex(theme, 'color.background.inverse')).toFixed(2);
    assert.equal(ratio('light'), '16.24');
    assert.equal(ratio('dark'), '5.88');
  });
});
