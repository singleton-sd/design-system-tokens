import StyleDictionary from 'style-dictionary';
import {
  registerSsdCssTransforms,
  shouldOutputCssReferences,
  tokenType,
} from './sd-css-transforms.mjs';

registerSsdCssTransforms(StyleDictionary);

export const isColor = (token) => tokenType(token) === 'color';
export const isDimension = (token) =>
  ['spacing', 'borderRadius', 'borderWidth', 'fontSizes', 'dimension'].includes(tokenType(token));

const JS_DTS_HEADER = `/**
 * Do not edit directly, this file was auto-generated.
 */

export interface DesignToken {
  $value?: unknown;
  $type?: string;
  name?: string;
  path?: string[];
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
}
`;

function isTokenLeaf(node) {
  return (
    node !== null &&
    typeof node === 'object' &&
    !Array.isArray(node) &&
    Object.hasOwn(node, '$value')
  );
}

function renderTokenTreeType(node, indent) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (isTokenLeaf(node)) {
    return 'DesignToken';
  }
  const entries = Object.entries(/** @type {Record<string, unknown>} */ (node));
  if (entries.length === 0) {
    return 'Record<string, never>';
  }
  const lines = entries.map(([key, child]) => {
    const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
    return `${inner}${safeKey}: ${renderTokenTreeType(child, indent + 1)};`;
  });
  return `{\n${lines.join('\n')}\n${pad}}`;
}

StyleDictionary.registerFormat({
  name: 'typescript/esm-default',
  format: ({ dictionary }) => {
    const tree = renderTokenTreeType(dictionary.tokens, 0);
    return `${JS_DTS_HEADER}
declare const tokens: ${tree};
export default tokens;
`;
  },
});

/**
 * @param {'light' | 'dark'} theme
 * @returns {import('style-dictionary').Config}
 */
export function createConfig(theme) {
  const isLight = theme === 'light';

  return {
    source: [
      'src/tokens/core.json',
      `src/tokens/semantic/${theme}.json`,
      'src/tokens/components.json',
    ],
    platforms: {
      css: {
        prefix: 'ssd',
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            options: {
              outputReferences: shouldOutputCssReferences,
              selector: `[data-theme='${theme}']`,
            },
          },
          {
            destination: `${theme}/_variables.css`,
            format: 'css/variables',
            options: {
              outputReferences: shouldOutputCssReferences,
              selector: `[data-theme='${theme}']`,
            },
          },
          {
            destination: `root/${theme}/_variables.css`,
            format: 'css/variables',
            options: {
              outputReferences: shouldOutputCssReferences,
              selector: ':root',
            },
          },
        ],
      },
      scss: {
        prefix: 'ssd',
        transformGroup: 'scss',
        buildPath: 'dist/scss/',
        files: [
          {
            destination: `_${theme}.scss`,
            format: 'scss/variables',
            options: { outputReferences: shouldOutputCssReferences },
          },
          {
            destination: `${theme}/_variables.scss`,
            format: 'scss/variables',
            options: { outputReferences: shouldOutputCssReferences },
          },
        ],
      },
      js: {
        prefix: 'ssd',
        transformGroup: 'js',
        buildPath: 'dist/js/',
        files: [
          {
            destination: `${theme}.mjs`,
            format: 'javascript/esm',
          },
          {
            destination: `${theme}.d.mts`,
            format: 'typescript/esm-default',
          },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [
          {
            destination: `${theme}.json`,
            format: 'json/nested',
          },
        ],
      },
      ios: {
        prefix: 'Ssd',
        transformGroup: 'ios-swift',
        buildPath: `dist/ios/${theme}/`,
        files: [
          {
            destination: 'StyleDictionary.swift',
            format: 'ios-swift/class.swift',
            options: {
              className: isLight ? 'SsdTokensLight' : 'SsdTokensDark',
            },
          },
        ],
      },
      android: {
        transformGroup: 'android',
        buildPath: `dist/android/${theme}/`,
        files: [
          {
            destination: 'colors.xml',
            format: 'android/resources',
            filter: isColor,
            options: { resourceType: 'color' },
          },
          {
            destination: 'dimens.xml',
            format: 'android/resources',
            filter: isDimension,
            options: { resourceType: 'dimen' },
          },
        ],
      },
      flutter: {
        transformGroup: 'flutter',
        buildPath: `dist/flutter/${theme}/`,
        files: [
          {
            destination: 'style_dictionary.dart',
            format: 'flutter/class.dart',
            options: {
              className: isLight ? 'SsdTokensLight' : 'SsdTokensDark',
            },
          },
        ],
      },
    },
  };
}
