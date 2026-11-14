/**
 * Framework-agnostic CSS var bindings (DTCG path → var(--ssd-*)).
 * Tailwind theme is derived from this map (`default` → `DEFAULT`).
 */

/** @type {readonly string[]} */
export const CSS_VAR_PATHS = Object.freeze([
  'color.text.default',
  'color.text.muted',
  'color.text.subtle',
  'color.text.disabled',
  'color.text.inverse',
  'color.text.brand',
  'color.text.on-brand',
  'color.text.link',
  'color.text.link-hover',
  'color.background.default',
  'color.background.muted',
  'color.background.subtle',
  'color.background.inverse',
  'color.background.brand',
  'color.background.brand-hovered',
  'color.border.default',
  'color.border.muted',
  'color.border.strong',
  'color.border.control',
  'color.border.focus',
  'color.border.brand',
  'color.icon.default',
  'color.icon.muted',
  'color.icon.inverse',
  'color.icon.brand',
  'color.feedback.danger.text',
  'color.feedback.danger.background',
  'color.feedback.danger.border',
  'color.feedback.warning.text',
  'color.feedback.warning.background',
  'color.feedback.warning.border',
  'color.feedback.success.text',
  'color.feedback.success.background',
  'color.feedback.success.border',
  'color.feedback.info.text',
  'color.feedback.info.background',
  'color.feedback.info.border',
  'font.family.heading',
  'font.family.body',
  'font.family.mono',
  'radius.sm',
  'radius.md',
  'radius.lg',
  'radius.xl',
  'radius.full',
  'shadow.sm',
  'shadow.md',
  'shadow.lg',
]);

/**
 * @param {string} path DTCG-style dotted path
 * @returns {string} e.g. var(--ssd-color-text-default)
 */
export function toCssVar(path) {
  return `var(--ssd-${path.split('.').join('-')})`;
}

/**
 * @param {readonly string[]} paths
 * @returns {Record<string, unknown>}
 */
export function buildCssVarsMap(paths = CSS_VAR_PATHS) {
  /** @type {Record<string, unknown>} */
  const root = {};
  for (const path of paths) {
    const parts = path.split('.');
    let cursor = root;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];
      if (!(part in cursor) || typeof cursor[part] !== 'object' || cursor[part] === null) {
        cursor[part] = {};
      }
      cursor = /** @type {Record<string, unknown>} */ (cursor[part]);
    }
    cursor[parts[parts.length - 1]] = toCssVar(path);
  }
  return root;
}

/**
 * Reshape to the published Tailwind v4 theme.
 * Color `default` becomes `DEFAULT`. Feedback keeps text as `DEFAULT` so
 * `*-feedback-danger` stays valid, and adds text/background/border roles.
 *
 * @param {Record<string, unknown>} cssVars
 */
export function toTailwindTheme(cssVars) {
  const color = /** @type {Record<string, Record<string, unknown>>} */ (cssVars.color ?? {});
  const font = /** @type {{ family?: Record<string, string> }} */ (cssVars.font ?? {});
  const radius = /** @type {Record<string, string>} */ (cssVars.radius ?? {});
  const shadow = /** @type {Record<string, string>} */ (cssVars.shadow ?? {});

  return {
    theme: {
      extend: {
        colors: {
          text: withDefaultKey(/** @type {Record<string, string>} */ (color.text ?? {})),
          background: withDefaultKey(/** @type {Record<string, string>} */ (color.background ?? {})),
          border: withDefaultKey(/** @type {Record<string, string>} */ (color.border ?? {})),
          icon: withDefaultKey(/** @type {Record<string, string>} */ (color.icon ?? {})),
          feedback: feedbackRoles(
            /** @type {Record<string, Record<string, string>>} */ (color.feedback ?? {}),
          ),
        },
        fontFamily: { ...(font.family ?? {}) },
        borderRadius: { ...radius },
        boxShadow: { ...shadow },
      },
    },
  };
}

/**
 * @param {Record<string, string>} group
 * @returns {Record<string, string>}
 */
function withDefaultKey(group) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const [key, value] of Object.entries(group)) {
    out[key === 'default' ? 'DEFAULT' : key] = value;
  }
  return out;
}

/**
 * @param {Record<string, Record<string, string>>} feedback
 * @returns {Record<string, Record<string, string>>}
 */
function feedbackRoles(feedback) {
  /** @type {Record<string, Record<string, string>>} */
  const out = {};
  for (const [tone, roles] of Object.entries(feedback)) {
    if (!roles || typeof roles !== 'object') {
      continue;
    }
    /** @type {Record<string, string>} */
    const next = { ...roles };
    if (typeof roles.text === 'string') {
      next.DEFAULT = roles.text;
    }
    out[tone] = next;
  }
  return out;
}

/**
 * @param {unknown} value
 * @param {number} indent
 * @returns {string}
 */
export function serializeJsValue(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(/** @type {Record<string, unknown>} */ (value));
    if (entries.length === 0) {
      return '{}';
    }
    const lines = entries.map(([key, child]) => {
      const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
      return `${inner}${safeKey}: ${serializeJsValue(child, indent + 1)},`;
    });
    return `{\n${lines.join('\n')}\n${pad}}`;
  }
  throw new TypeError(`Unsupported value type: ${typeof value}`);
}

/**
 * @param {Record<string, unknown>} cssVars
 * @returns {string}
 */
export function renderCssVarsModule(cssVars) {
  return `/** Framework-agnostic CSS var bindings (DTCG path → var(--ssd-*)). */
export default ${serializeJsValue(cssVars)};
`;
}

/**
 * @param {Record<string, unknown>} cssVars
 * @returns {string}
 */
export function renderCssVarsDts(cssVars) {
  return `declare const cssVars: ${renderTsType(cssVars, 0)};
export default cssVars;
`;
}

/**
 * @param {unknown} value
 * @param {number} indent
 * @returns {string}
 */
function renderTsType(value, indent) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(/** @type {Record<string, unknown>} */ (value));
    if (entries.length === 0) {
      return 'Record<string, never>';
    }
    const lines = entries.map(([key, child]) => {
      const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
      return `${inner}${safeKey}: ${renderTsType(child, indent + 1)};`;
    });
    return `{\n${lines.join('\n')}\n${pad}}`;
  }
  throw new TypeError(`Unsupported value type: ${typeof value}`);
}

/**
 * @param {ReturnType<typeof toTailwindTheme>} theme
 * @returns {string}
 */
export function renderTailwindThemeModule(theme) {
  return `/** Tailwind v4-friendly theme that maps to published --ssd-* CSS variables. */
export default ${serializeJsValue(theme)};
`;
}
