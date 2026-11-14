/**
 * CSS/SCSS value transforms for composite typography and shadow tokens.
 *
 * Style Dictionary's built-in `typography/css/shorthand` + outputReferences
 * corrupts names like `--ssd-font-size-300` by substituting letter-spacing `0`,
 * and quotes `var(--ssd-font-family-*)` as a single string. The built-in
 * `shadow/css/shorthand` emits the DTCG `dropShadow` type into CSS.
 */

export const SHADOW_ALPHA = Object.freeze({
  sm: 0.12,
  md: 0.16,
  lg: 0.2,
});

const TOKEN_REF = /^\{([^}]+)\}$/;

/**
 * @param {unknown} token
 * @returns {string | undefined}
 */
export function tokenType(token) {
  const typed = /** @type {{ $type?: string, type?: string }} */ (token);
  return typed.$type ?? typed.type;
}

/**
 * Skip outputReferences for composites — we emit CSS vars ourselves.
 *
 * @param {unknown} token
 * @returns {boolean}
 */
export function shouldOutputCssReferences(token) {
  const type = tokenType(token);
  return type !== 'typography' && type !== 'shadow';
}

/**
 * @param {string} segment
 * @returns {string}
 */
function kebabSegment(segment) {
  return String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

/**
 * @param {string[]} path
 * @returns {string}
 */
export function cssCustomPropertyName(path) {
  return ['ssd', ...path].map(kebabSegment).join('-');
}

/**
 * @param {unknown} raw
 * @param {'css' | 'scss'} syntax
 * @returns {string | null}
 */
export function cssRef(raw, syntax) {
  if (typeof raw !== 'string') {
    return null;
  }
  const match = raw.match(TOKEN_REF);
  if (!match) {
    return null;
  }
  const name = cssCustomPropertyName(match[1].split('.'));
  return syntax === 'scss' ? `$${name}` : `var(--${name})`;
}

/**
 * @param {unknown} raw
 * @param {'css' | 'scss'} syntax
 * @returns {string}
 */
function cssOrRaw(raw, syntax) {
  return cssRef(raw, syntax) ?? String(raw);
}

/**
 * Quote family names that need it; keep comma-separated lists as lists.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function quoteFontFamilyList(value) {
  return String(value)
    .split(',')
    .map((part) => {
      const name = part.trim();
      if (!name) {
        return '';
      }
      if (
        (name.startsWith("'") && name.endsWith("'")) ||
        (name.startsWith('"') && name.endsWith('"'))
      ) {
        return name;
      }
      if (/^[a-zA-Z][\w-]*$/.test(name)) {
        return name;
      }
      return `'${name.replace(/'/g, "\\'")}'`;
    })
    .filter(Boolean)
    .join(', ');
}

/**
 * @param {unknown} raw
 * @param {'css' | 'scss'} syntax
 * @returns {string}
 */
function fontFamilyCss(raw, syntax) {
  const ref = cssRef(raw, syntax);
  if (ref) {
    return ref;
  }
  return quoteFontFamilyList(raw);
}

/**
 * @param {unknown} token
 * @returns {unknown}
 */
function originalValue(token) {
  const typed = /** @type {{ original?: { $value?: unknown, value?: unknown } }} */ (token);
  return typed.original?.$value ?? typed.original?.value;
}

/**
 * CSS `font` shorthand. Letter-spacing is not part of `font` and is omitted
 * so outputReferences cannot splice it into `--ssd-font-size-300`.
 *
 * @param {unknown} token
 * @param {'css' | 'scss'} syntax
 * @returns {string}
 */
export function typographyShorthand(token, syntax) {
  const original = originalValue(token);
  if (!original || typeof original !== 'object' || Array.isArray(original)) {
    const val = /** @type {{ $value?: unknown, value?: unknown }} */ (token).$value ??
      /** @type {{ value?: unknown }} */ (token).value;
    return typeof val === 'string' ? val : String(val);
  }
  const fields = /** @type {Record<string, unknown>} */ (original);
  const weight = cssOrRaw(fields.fontWeight, syntax);
  const size = cssOrRaw(fields.fontSize, syntax);
  const lineHeight = cssOrRaw(fields.lineHeight, syntax);
  const family = fontFamilyCss(fields.fontFamily, syntax);
  if (syntax === 'scss') {
    // `$a/$b` is Sass division. `#{…}` looks like a Style Dictionary
    // token ref. Concatenate through `unquote` so `/` stays CSS.
    return `${weight} unquote(${size} + '/' + ${lineHeight}) ${family}`;
  }
  return `${weight} ${size}/${lineHeight} ${family}`;
}

/**
 * @param {unknown} token
 * @returns {number}
 */
function shadowAlpha(token) {
  const path = /** @type {{ path?: string[] }} */ (token).path ?? [];
  const step = path[1];
  if (step === 'sm' || step === 'md' || step === 'lg') {
    return SHADOW_ALPHA[step];
  }
  return SHADOW_ALPHA.sm;
}

/**
 * Valid `box-shadow` value. Drops DTCG `type: dropShadow` and applies alpha
 * via `color-mix` against the referenced colour (gray-900 / black).
 *
 * @param {unknown} token
 * @param {'css' | 'scss'} syntax
 * @returns {string}
 */
export function boxShadowCss(token, syntax) {
  const original = originalValue(token);
  const resolved =
    /** @type {{ $value?: unknown, value?: unknown }} */ (token).$value ??
    /** @type {{ value?: unknown }} */ (token).value;
  const layer =
    original && typeof original === 'object' && !Array.isArray(original) ? original : resolved;
  if (!layer || typeof layer !== 'object' || Array.isArray(layer)) {
    return typeof resolved === 'string' ? resolved : String(resolved);
  }
  const fields = /** @type {Record<string, unknown>} */ (layer);
  const alphaPct = Math.round(shadowAlpha(token) * 100);
  const colorRef = cssRef(fields.color, syntax);
  const color = colorRef
    ? `color-mix(in srgb, ${colorRef} ${alphaPct}%, transparent)`
    : `color-mix(in srgb, ${fields.color} ${alphaPct}%, transparent)`;
  const offsetX = cssOrRaw(fields.offsetX ?? '0px', syntax);
  const offsetY = cssOrRaw(fields.offsetY ?? '0px', syntax);
  const blur = cssOrRaw(fields.blur ?? '0px', syntax);
  const spread = cssOrRaw(fields.spread ?? '0px', syntax);
  return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
}

/**
 * @param {typeof import('style-dictionary').default} StyleDictionary
 */
export function registerSsdCssTransforms(StyleDictionary) {
  StyleDictionary.registerTransform({
    name: 'ssd/typography/css',
    type: 'value',
    transitive: true,
    filter: (token) => tokenType(token) === 'typography',
    transform: (token) => typographyShorthand(token, 'css'),
  });
  StyleDictionary.registerTransform({
    name: 'ssd/typography/scss',
    type: 'value',
    transitive: true,
    filter: (token) => tokenType(token) === 'typography',
    transform: (token) => typographyShorthand(token, 'scss'),
  });
  StyleDictionary.registerTransform({
    name: 'ssd/shadow/css',
    type: 'value',
    transitive: true,
    filter: (token) => tokenType(token) === 'shadow',
    transform: (token) => boxShadowCss(token, 'css'),
  });
  StyleDictionary.registerTransform({
    name: 'ssd/shadow/scss',
    type: 'value',
    transitive: true,
    filter: (token) => tokenType(token) === 'shadow',
    transform: (token) => boxShadowCss(token, 'scss'),
  });

  const originalCss = [...StyleDictionary.hooks.transformGroups.css];
  const originalScss = [...StyleDictionary.hooks.transformGroups.scss];

  StyleDictionary.registerTransformGroup({
    name: 'css',
    transforms: originalCss.map((name) => {
      if (name === 'typography/css/shorthand') {
        return 'ssd/typography/css';
      }
      if (name === 'shadow/css/shorthand') {
        return 'ssd/shadow/css';
      }
      return name;
    }),
  });

  StyleDictionary.registerTransformGroup({
    name: 'scss',
    transforms: originalScss.map((name) => {
      if (name === 'typography/css/shorthand') {
        return 'ssd/typography/scss';
      }
      if (name === 'shadow/css/shorthand') {
        return 'ssd/shadow/scss';
      }
      return name;
    }),
  });
}
