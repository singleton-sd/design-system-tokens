import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';
import { createConfig } from './sd-config.mjs';

const core = JSON.parse(readFileSync('src/tokens/core.json', 'utf8'));
const light = JSON.parse(readFileSync('src/tokens/semantic/light.json', 'utf8'));
const dark = JSON.parse(readFileSync('src/tokens/semantic/dark.json', 'utf8'));
const components = JSON.parse(readFileSync('src/tokens/components.json', 'utf8'));

const metadata = {
  tokenSetOrder: ['core', 'semantic/light', 'semantic/dark', 'components'],
};

const themes = [
  {
    name: 'Light',
    group: 'theme',
    selectedTokenSets: {
      core: 'enabled',
      'semantic/light': 'enabled',
      components: 'enabled',
    },
  },
  {
    name: 'Dark',
    group: 'theme',
    selectedTokenSets: {
      core: 'enabled',
      'semantic/dark': 'enabled',
      components: 'enabled',
    },
  },
];

const master = { core, light, dark, components };
writeFileSync('src/tokens/tokens.master.json', `${JSON.stringify(master, null, 2)}\n`);
writeFileSync('src/tokens/$metadata.json', `${JSON.stringify(metadata, null, 2)}\n`);
writeFileSync('src/tokens/$themes.json', `${JSON.stringify(themes, null, 2)}\n`);

mkdirSync('dist', { recursive: true });
mkdirSync('dist/tailwind', { recursive: true });
mkdirSync('dist/scss', { recursive: true });
mkdirSync('dist/js', { recursive: true });
writeFileSync(
  'dist/tokens.json',
  `${JSON.stringify({ $metadata: metadata, $themes: themes, core, light, dark, components }, null, 2)}\n`,
);

writeFileSync(
  'dist/scss/_tokens.scss',
  `@forward 'light';\n@forward 'dark';\n`,
);

writeFileSync(
  'dist/tailwind/theme.js',
  `/** Tailwind v4-friendly theme that maps to published --ssd-* CSS variables. */
export default {
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: 'var(--ssd-color-text-default)',
          muted: 'var(--ssd-color-text-muted)',
          subtle: 'var(--ssd-color-text-subtle)',
          disabled: 'var(--ssd-color-text-disabled)',
          inverse: 'var(--ssd-color-text-inverse)',
          brand: 'var(--ssd-color-text-brand)',
          'on-brand': 'var(--ssd-color-text-on-brand)',
          link: 'var(--ssd-color-text-link)',
        },
        background: {
          DEFAULT: 'var(--ssd-color-background-default)',
          muted: 'var(--ssd-color-background-muted)',
          subtle: 'var(--ssd-color-background-subtle)',
          inverse: 'var(--ssd-color-background-inverse)',
          brand: 'var(--ssd-color-background-brand)',
          'brand-hovered': 'var(--ssd-color-background-brand-hovered)',
        },
        border: {
          DEFAULT: 'var(--ssd-color-border-default)',
          muted: 'var(--ssd-color-border-muted)',
          strong: 'var(--ssd-color-border-strong)',
          focus: 'var(--ssd-color-border-focus)',
          brand: 'var(--ssd-color-border-brand)',
        },
        icon: {
          DEFAULT: 'var(--ssd-color-icon-default)',
          muted: 'var(--ssd-color-icon-muted)',
          inverse: 'var(--ssd-color-icon-inverse)',
          brand: 'var(--ssd-color-icon-brand)',
        },
        feedback: {
          danger: 'var(--ssd-color-feedback-danger-text)',
          warning: 'var(--ssd-color-feedback-warning-text)',
          success: 'var(--ssd-color-feedback-success-text)',
          info: 'var(--ssd-color-feedback-info-text)',
        },
      },
      fontFamily: {
        heading: 'var(--ssd-font-family-heading)',
        body: 'var(--ssd-font-family-body)',
        mono: 'var(--ssd-font-family-mono)',
      },
      borderRadius: {
        sm: 'var(--ssd-radius-sm)',
        md: 'var(--ssd-radius-md)',
        lg: 'var(--ssd-radius-lg)',
        xl: 'var(--ssd-radius-xl)',
        full: 'var(--ssd-radius-full)',
      },
      boxShadow: {
        sm: 'var(--ssd-shadow-sm)',
        md: 'var(--ssd-shadow-md)',
        lg: 'var(--ssd-shadow-lg)',
      },
    },
  },
};
`,
);

for (const theme of ['light', 'dark']) {
  const sd = new StyleDictionary(createConfig(theme));
  await sd.buildAllPlatforms();
}

writeFileSync(
  'dist/js/tokens.mjs',
  `export * as light from './light.mjs';\nexport * as dark from './dark.mjs';\n`,
);
writeFileSync(
  'dist/js/tokens.d.ts',
  `export * as light from './light';\nexport * as dark from './dark';\n`,
);
