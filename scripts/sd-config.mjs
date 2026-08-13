const tokenType = (token) => token.$type ?? token.type;

export const isColor = (token) => tokenType(token) === 'color';
export const isDimension = (token) =>
  ['spacing', 'borderRadius', 'borderWidth', 'fontSizes', 'dimension'].includes(tokenType(token));

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
              outputReferences: true,
              selector: `[data-theme='${theme}']`,
            },
          },
          {
            destination: `${theme}/_variables.css`,
            format: 'css/variables',
            options: {
              outputReferences: true,
              selector: `[data-theme='${theme}']`,
            },
          },
          {
            destination: `root/${theme}/_variables.css`,
            format: 'css/variables',
            options: {
              outputReferences: true,
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
            options: { outputReferences: true },
          },
          {
            destination: `${theme}/_variables.scss`,
            format: 'scss/variables',
            options: { outputReferences: true },
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
            destination: `${theme}.d.ts`,
            format: 'typescript/es6-declarations',
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
