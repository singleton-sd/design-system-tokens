/** Framework-agnostic CSS var bindings (DTCG path → var(--ssd-*)). */
export default {
  color: {
    text: {
      default: 'var(--ssd-color-text-default)',
      muted: 'var(--ssd-color-text-muted)',
      subtle: 'var(--ssd-color-text-subtle)',
      disabled: 'var(--ssd-color-text-disabled)',
      inverse: 'var(--ssd-color-text-inverse)',
      brand: 'var(--ssd-color-text-brand)',
      'on-brand': 'var(--ssd-color-text-on-brand)',
      link: 'var(--ssd-color-text-link)',
    },
    background: {
      default: 'var(--ssd-color-background-default)',
      muted: 'var(--ssd-color-background-muted)',
      subtle: 'var(--ssd-color-background-subtle)',
      inverse: 'var(--ssd-color-background-inverse)',
      brand: 'var(--ssd-color-background-brand)',
      'brand-hovered': 'var(--ssd-color-background-brand-hovered)',
    },
    border: {
      default: 'var(--ssd-color-border-default)',
      muted: 'var(--ssd-color-border-muted)',
      strong: 'var(--ssd-color-border-strong)',
      focus: 'var(--ssd-color-border-focus)',
      brand: 'var(--ssd-color-border-brand)',
    },
    icon: {
      default: 'var(--ssd-color-icon-default)',
      muted: 'var(--ssd-color-icon-muted)',
      inverse: 'var(--ssd-color-icon-inverse)',
      brand: 'var(--ssd-color-icon-brand)',
    },
    feedback: {
      danger: {
        text: 'var(--ssd-color-feedback-danger-text)',
        background: 'var(--ssd-color-feedback-danger-background)',
        border: 'var(--ssd-color-feedback-danger-border)',
      },
      warning: {
        text: 'var(--ssd-color-feedback-warning-text)',
        background: 'var(--ssd-color-feedback-warning-background)',
        border: 'var(--ssd-color-feedback-warning-border)',
      },
      success: {
        text: 'var(--ssd-color-feedback-success-text)',
        background: 'var(--ssd-color-feedback-success-background)',
        border: 'var(--ssd-color-feedback-success-border)',
      },
      info: {
        text: 'var(--ssd-color-feedback-info-text)',
        background: 'var(--ssd-color-feedback-info-background)',
        border: 'var(--ssd-color-feedback-info-border)',
      },
    },
  },
  font: {
    family: {
      heading: 'var(--ssd-font-family-heading)',
      body: 'var(--ssd-font-family-body)',
      mono: 'var(--ssd-font-family-mono)',
    },
  },
  radius: {
    sm: 'var(--ssd-radius-sm)',
    md: 'var(--ssd-radius-md)',
    lg: 'var(--ssd-radius-lg)',
    xl: 'var(--ssd-radius-xl)',
    full: 'var(--ssd-radius-full)',
  },
  shadow: {
    sm: 'var(--ssd-shadow-sm)',
    md: 'var(--ssd-shadow-md)',
    lg: 'var(--ssd-shadow-lg)',
  },
};
