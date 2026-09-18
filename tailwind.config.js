/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        ink: {
          950: "rgb(var(--color-ink-950) / <alpha-value>)",
          900: "rgb(var(--color-ink-900) / <alpha-value>)",
          800: "rgb(var(--color-ink-800) / <alpha-value>)",
          700: "rgb(var(--color-ink-700) / <alpha-value>)",
          600: "rgb(var(--color-ink-600) / <alpha-value>)",
          500: "rgb(var(--color-ink-500) / <alpha-value>)",
          400: "rgb(var(--color-ink-400) / <alpha-value>)",
        },
        paper: {
          50: "rgb(var(--color-paper-50) / <alpha-value>)",
          100: "rgb(var(--color-paper-100) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--color-signal) / <alpha-value>)",
          light: "rgb(var(--color-signal-light) / <alpha-value>)",
          dark: "rgb(var(--color-signal-dark) / <alpha-value>)",
        },
        ion: {
          DEFAULT: "rgb(var(--color-ion) / <alpha-value>)",
          light: "rgb(var(--color-ion-light) / <alpha-value>)",
        },
        mint: {
          DEFAULT: "rgb(var(--color-mint) / <alpha-value>)",
          dark: "rgb(var(--color-mint-dark) / <alpha-value>)",
        },
        coral: {
          DEFAULT: "rgb(var(--color-coral) / <alpha-value>)",
          dark: "rgb(var(--color-coral-dark) / <alpha-value>)",
        },
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl2: "0.875rem",
      },
    },
  },
  plugins: [],
}

