import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve('src/tokens/split/core.json');

const flattenTypographyTokens = (input) => {
  const result = {};

  const typography = input.typography || (input.core && input.core.typography);
  if (!typography) {
    console.error('❌ No typography tokens found.');
    process.exit(1);
  }

  for (const [tokenName, token] of Object.entries(typography)) {
    const basePath = `typography.${tokenName}`;
    const value = token.$value || {};
    for (const [subKey, subValue] of Object.entries(value)) {
      let type;

      switch (subKey) {
        case 'fontSize':
        case 'paragraphSpacing':
          type = 'dimension';
          break;
        case 'fontFamily':
          type = 'fontFamily';
          break;
        case 'fontWeight':
          type = 'fontWeight';
          break;
        case 'lineHeight':
          type = 'lineHeight';
          break;
        case 'letterSpacing':
          type = 'letterSpacing';
          break;
        case 'textCase':
          type = 'textTransform';
          break;
        case 'textDecoration':
          type = 'textDecoration';
          break;
        default:
          type = 'unknown';
      }

      result[`${basePath}.${subKey}`] = {
        $type: type,
        $value: subValue,
      };
    }
  }

  return result;
};

// --- Run ---
const json = JSON.parse(readFileSync(inputPath, 'utf8'));

// Flatten and merge
const flattened = flattenTypographyTokens(json);

// Remove original `typography` group
delete json.typography;

// Merge flattened tokens at root level
Object.assign(json, flattened);

// Write back to same file
writeFileSync(inputPath, JSON.stringify(json, null, 2));
console.log(`✅ Typography flattened and updated in-place: ${inputPath}`);
