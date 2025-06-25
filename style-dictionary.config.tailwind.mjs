import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

const tailwind = makeSdTailwindConfig({
  buildPath: 'dist/tailwind/',
  source: [
    'src/tokens/split/core.json',
    'src/tokens/split/light.json',
    'src/tokens/split/theme.json',
  ],
  isVariables: true,
  type: 'all',
});

/** @type {import('style-dictionary').Config} */
export default {
  ...tailwind,
  source: [
    'src/tokens/split/core.json',
    'src/tokens/split/light.json',
    'src/tokens/split/theme.json',
  ],
};
