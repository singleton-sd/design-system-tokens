/** @type {import('style-dictionary').Config} */
export default {
  source: [
    'src/tokens/split/core.json',
    'src/tokens/split/dark.json',
    'src/tokens/split/theme.json',
  ],
  platforms: {
    'css-dark': {
      transformGroup: 'css',
      buildPath: 'dist/css/dark/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: "[data-theme='dark']",
          },
        },
      ],
    },
    'scss-dark': {
      transformGroup: 'scss',
      buildPath: 'dist/scss/dark/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    'css-root': {
      transformGroup: 'css',
      buildPath: 'dist/css/root/dark',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
  },
};
