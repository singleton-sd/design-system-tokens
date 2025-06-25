/** @type {import('style-dictionary').Config} */
export default {
  source: [
    'src/tokens/split/core.json',
    'src/tokens/split/light.json',
    'src/tokens/split/theme.json',
  ],
  platforms: {
    'css-light': {
      transformGroup: 'css',
      buildPath: 'dist/css/light/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: "[data-theme='light']",
          },
        },
      ],
    },
    'scss-light': {
      transformGroup: 'scss',
      buildPath: 'dist/scss/light/',
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
  },
};
