import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';
import {
  buildCssVarsMap,
  renderCssVarsDts,
  renderCssVarsModule,
  renderTailwindThemeModule,
  toTailwindTheme,
} from './css-vars-map.mjs';
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
mkdirSync('dist/css-vars', { recursive: true });
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

const cssVars = buildCssVarsMap();
writeFileSync('dist/css-vars/index.mjs', renderCssVarsModule(cssVars));
writeFileSync('dist/css-vars/index.d.ts', renderCssVarsDts(cssVars));
writeFileSync(
  'dist/tailwind/theme.js',
  renderTailwindThemeModule(toTailwindTheme(cssVars)),
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
