import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      domine: ['var(--font-domine)', 'serif'],
      domaine: ['var(--font-domaine-display-narrow)', 'serif'],
    },
    backdropBlur: {
      'none': 'none',
      'sm': '4px',
      'md': '8px',
      'lg': '12px',
      'xl': '200px',
      '2xl': '50px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'max-lg': { 'max': '1023px' },
    },
    extend: {
      gradientColorStops: {
        'slate-100': '#F8FAFC',
        'teal-900': '#00303F',
      },
      gradientOpacity: {
        '0': '0',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
    },
    colors: {
      'primary': "#0078D4",
      'secondary': "#e11d48",
      'tertiary': "#1F2E43",
      'danger': "#C92435",
      'warning': "#c2410c",
      "slate-bg": "#1f2937",
      "stone-bg": "#4b5563",
      "zinc-900": "#18181b",
      "teal-900": "#134e4a",

      'body': "#212529",
      'surface': "#F0FAFF",
      'background': "#FFFFFF",
      'background-gray': "#FAFAFA",
      'emerald': "#134E4A",
      'blueGray': "#E2E8F0",
      gray: colors.gray,
      white: colors.white,
      blue: colors.blue,
      indigo: colors.indigo,
      teal: colors.teal,
      green: colors.green,
      zinc: colors.zinc
    },
    container: {
      padding: {
        DEFAULT: '2rem',
      },
    },
  },

  plugins: [
  ],
};

export default config;

