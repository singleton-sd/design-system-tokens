import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// 📁 Configurable paths
const OUTPUT_FOLDER = 'src/tokens/split';
const INPUT_FILE = 'src/tokens/tokens.master.json';

// ✅ Transform camelCase or PascalCase to kebab-case
const toKebabCase = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// ✅ Load and check input
if (!existsSync(INPUT_FILE)) {
  console.error(`❌ File not found: ${INPUT_FILE}`);
  process.exit(1);
}

mkdirSync(OUTPUT_FOLDER, { recursive: true });

const masterTokens = JSON.parse(readFileSync(INPUT_FILE, 'utf8'));

// ✅ Process and write each token group
for (const [group, content] of Object.entries(masterTokens)) {
  const kebabFileName = `${toKebabCase(group)}.json`;
  const filePath = join(OUTPUT_FOLDER, kebabFileName);
  const json = JSON.stringify(content, null, 2);

  writeFileSync(filePath, json, 'utf8');
  console.log(`✅ Wrote ${filePath}`);
}

console.log(`\n🎉 All token files saved to: ${OUTPUT_FOLDER}`);
