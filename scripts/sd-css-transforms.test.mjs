import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  boxShadowCss,
  cssCustomPropertyName,
  cssRef,
  quoteFontFamilyList,
  shouldOutputCssReferences,
  typographyShorthand,
} from './sd-css-transforms.mjs';

describe('cssCustomPropertyName', () => {
  it('kebabs camelCase path segments', () => {
    assert.equal(cssCustomPropertyName(['letterSpacing', 'default']), 'ssd-letter-spacing-default');
    assert.equal(cssCustomPropertyName(['font', 'size', '300']), 'ssd-font-size-300');
  });
});

describe('cssRef', () => {
  it('emits CSS custom properties and SCSS variables', () => {
    assert.equal(cssRef('{font.size.300}', 'css'), 'var(--ssd-font-size-300)');
    assert.equal(cssRef('{font.size.300}', 'scss'), '$ssd-font-size-300');
    assert.equal(cssRef('16px', 'css'), null);
  });
});

describe('quoteFontFamilyList', () => {
  it('quotes names with spaces but keeps comma lists', () => {
    assert.equal(quoteFontFamilyList('Open Sauce Sans'), "'Open Sauce Sans'");
    assert.equal(
      quoteFontFamilyList('ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'),
      'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    );
  });
});

describe('typographyShorthand', () => {
  it('emits a valid font shorthand with unquoted family vars', () => {
    const token = {
      $type: 'typography',
      original: {
        $value: {
          fontFamily: '{font.family.body}',
          fontWeight: '{font.weight.regular}',
          fontSize: '{font.size.300}',
          lineHeight: '{lineHeight.body}',
          letterSpacing: '{letterSpacing.default}',
        },
      },
    };
    assert.equal(
      typographyShorthand(token, 'css'),
      'var(--ssd-font-weight-regular) var(--ssd-font-size-300)/var(--ssd-line-height-body) var(--ssd-font-family-body)',
    );
    assert.doesNotMatch(typographyShorthand(token, 'css'), /font-size-\d+var\(/);
    assert.doesNotMatch(typographyShorthand(token, 'css'), /'var\(/);
    assert.equal(
      typographyShorthand(token, 'scss'),
      "$ssd-font-weight-regular unquote($ssd-font-size-300 + '/' + $ssd-line-height-body) $ssd-font-family-body",
    );
    assert.doesNotMatch(typographyShorthand(token, 'scss'), /var\(--ssd-/);
  });
});

describe('boxShadowCss', () => {
  it('emits box-shadow with alpha color-mix and no dropShadow type', () => {
    const token = {
      $type: 'shadow',
      path: ['shadow', 'sm'],
      original: {
        $value: {
          offsetX: '0px',
          offsetY: '1px',
          blur: '2px',
          spread: '0px',
          color: '{color.gray.900}',
          type: 'dropShadow',
        },
      },
    };
    const value = boxShadowCss(token, 'css');
    assert.equal(
      value,
      '0px 1px 2px 0px color-mix(in srgb, var(--ssd-color-gray-900) 12%, transparent)',
    );
    assert.doesNotMatch(value, /dropShadow/);
  });
});

describe('shouldOutputCssReferences', () => {
  it('disables naive replacement for composites', () => {
    assert.equal(shouldOutputCssReferences({ $type: 'color' }), true);
    assert.equal(shouldOutputCssReferences({ $type: 'typography' }), false);
    assert.equal(shouldOutputCssReferences({ $type: 'shadow' }), false);
  });
});
