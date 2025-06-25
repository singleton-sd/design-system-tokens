/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "var(--colors-black)",
        white: "var(--colors-white)",
        gray: {
          100: "var(--colors-gray-100)",
          200: "var(--colors-gray-200)",
          300: "var(--colors-gray-300)",
          400: "var(--colors-gray-400)",
          500: "var(--colors-gray-500)",
          600: "var(--colors-gray-600)",
          700: "var(--colors-gray-700)",
          800: "var(--colors-gray-800)",
          900: "var(--colors-gray-900)"
        },
        red: {
          100: "var(--colors-red-100)",
          200: "var(--colors-red-200)",
          300: "var(--colors-red-300)",
          400: "var(--colors-red-400)",
          500: "var(--colors-red-500)",
          600: "var(--colors-red-600)",
          700: "var(--colors-red-700)",
          800: "var(--colors-red-800)",
          900: "var(--colors-red-900)"
        },
        orange: {
          100: "var(--colors-orange-100)",
          200: "var(--colors-orange-200)",
          300: "var(--colors-orange-300)",
          400: "var(--colors-orange-400)",
          500: "var(--colors-orange-500)",
          600: "var(--colors-orange-600)",
          700: "var(--colors-orange-700)",
          800: "var(--colors-orange-800)",
          900: "var(--colors-orange-900)"
        },
        yellowDark: {
          100: "var(--colors-yellow-dark-100)",
          200: "var(--colors-yellow-dark-200)",
          300: "var(--colors-yellow-dark-300)",
          400: "var(--colors-yellow-dark-400)",
          500: "var(--colors-yellow-dark-500)",
          600: "var(--colors-yellow-dark-600)",
          700: "var(--colors-yellow-dark-700)",
          800: "var(--colors-yellow-dark-800)",
          900: "var(--colors-yellow-dark-900)"
        },
        green: {
          100: "var(--colors-green-100)",
          200: "var(--colors-green-200)",
          300: "var(--colors-green-300)",
          400: "var(--colors-green-400)",
          500: "var(--colors-green-500)",
          600: "var(--colors-green-600)",
          700: "var(--colors-green-700)",
          800: "var(--colors-green-800)",
          900: "var(--colors-green-900)"
        },
        teal: {
          100: "var(--colors-teal-100)",
          200: "var(--colors-teal-200)",
          300: "var(--colors-teal-300)",
          400: "var(--colors-teal-400)",
          500: "var(--colors-teal-500)",
          600: "var(--colors-teal-600)",
          700: "var(--colors-teal-700)",
          800: "var(--colors-teal-800)",
          900: "var(--colors-teal-900)"
        },
        blue: {
          100: "var(--colors-blue-100)",
          200: "var(--colors-blue-200)",
          300: "var(--colors-blue-300)",
          400: "var(--colors-blue-400)",
          500: "var(--colors-blue-500)",
          600: "var(--colors-blue-600)",
          700: "var(--colors-blue-700)",
          800: "var(--colors-blue-800)",
          900: "var(--colors-blue-900)"
        },
        indigo: {
          100: "var(--colors-indigo-100)",
          200: "var(--colors-indigo-200)",
          300: "var(--colors-indigo-300)",
          400: "var(--colors-indigo-400)",
          500: "var(--colors-indigo-500)",
          600: "var(--colors-indigo-600)",
          700: "var(--colors-indigo-700)",
          800: "var(--colors-indigo-800)",
          900: "var(--colors-indigo-900)"
        },
        purple: {
          100: "var(--colors-purple-100)",
          200: "var(--colors-purple-200)",
          300: "var(--colors-purple-300)",
          400: "var(--colors-purple-400)",
          500: "var(--colors-purple-500)",
          600: "var(--colors-purple-600)",
          700: "var(--colors-purple-700)",
          800: "var(--colors-purple-800)",
          900: "var(--colors-purple-900)"
        },
        pink: {
          100: "var(--colors-pink-100)",
          200: "var(--colors-pink-200)",
          300: "var(--colors-pink-300)",
          400: "var(--colors-pink-400)",
          500: "var(--colors-pink-500)",
          600: "var(--colors-pink-600)",
          700: "var(--colors-pink-700)",
          800: "var(--colors-pink-800)",
          900: "var(--colors-pink-900)"
        },
        yellowLight: {
          100: "var(--colors-yellow-light-100)",
          200: "var(--colors-yellow-light-200)",
          300: "var(--colors-yellow-light-300)",
          400: "var(--colors-yellow-light-400)",
          500: "var(--colors-yellow-light-500)",
          600: "var(--colors-yellow-light-600)",
          700: "var(--colors-yellow-light-700)",
          800: "var(--colors-yellow-light-800)",
          900: "var(--colors-yellow-light-900)"
        }
      },
      fontSizes: {
        base: "var(--font-sizes-base)",
    "heading6": "var(--font-sizes-heading6)",
    "heading5": "var(--font-sizes-heading5)",
    "heading4": "var(--font-sizes-heading4)",
    "heading3": "var(--font-sizes-heading3)",
    "heading2": "var(--font-sizes-heading2)",
    "heading1": "var(--font-sizes-heading1)"
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        xxl: "var(--spacing-xxl)"
      },
      fontFamilies: {
        heading: "var(--font-families-heading)",
        body: "var(--font-families-body)"
      },
      fontWeights: {
        light: "var(--font-weights-light)",
        regular: "var(--font-weights-regular)",
        medium: "var(--font-weights-medium)",
        semiBold: "var(--font-weights-semi-bold)",
        bold: "var(--font-weights-bold)",
        extraBold: "var(--font-weights-extra-bold)",
        black: "var(--font-weights-black)"
      },
      letterSpacing: {
        default: "var(--letter-spacing-default)",
        heading: "var(--letter-spacing-heading)"
      },
      lineHeights: {
        heading: "var(--line-heights-heading)",
        body: "var(--line-heights-body)"
      },
      fg: {
        default: "var(--fg-default)",
        muted: "var(--fg-muted)",
        subtle: "var(--fg-subtle)"
      },
      bg: {
        default: "var(--bg-default)",
        muted: "var(--bg-muted)",
        subtle: "var(--bg-subtle)"
      },
      accent: {
        default: "var(--accent-default)",
        onAccent: "var(--accent-on-accent)",
        bg: "var(--accent-bg)"
      },
      shadows: {
        default: "var(--shadows-default)"
      },
      fgAlternative: {
        default: "var(--fg-alternative-default)",
        muted: "var(--fg-alternative-muted)",
        subtle: "var(--fg-alternative-subtle)"
      }
    },
  },
}