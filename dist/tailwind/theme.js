/** Tailwind v4-friendly theme that maps to published --ssd-* CSS variables. */
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
          'link-hover': 'var(--ssd-color-text-link-hover)',
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
          control: 'var(--ssd-color-border-control)',
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
          danger: {
            text: 'var(--ssd-color-feedback-danger-text)',
            background: 'var(--ssd-color-feedback-danger-background)',
            border: 'var(--ssd-color-feedback-danger-border)',
            DEFAULT: 'var(--ssd-color-feedback-danger-text)',
          },
          warning: {
            text: 'var(--ssd-color-feedback-warning-text)',
            background: 'var(--ssd-color-feedback-warning-background)',
            border: 'var(--ssd-color-feedback-warning-border)',
            DEFAULT: 'var(--ssd-color-feedback-warning-text)',
          },
          success: {
            text: 'var(--ssd-color-feedback-success-text)',
            background: 'var(--ssd-color-feedback-success-background)',
            border: 'var(--ssd-color-feedback-success-border)',
            DEFAULT: 'var(--ssd-color-feedback-success-text)',
          },
          info: {
            text: 'var(--ssd-color-feedback-info-text)',
            background: 'var(--ssd-color-feedback-info-background)',
            border: 'var(--ssd-color-feedback-info-border)',
            DEFAULT: 'var(--ssd-color-feedback-info-text)',
          },
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
