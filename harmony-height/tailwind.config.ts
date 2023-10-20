import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#D2B48C',
          secondary: '#f3cb1b',
          accent: '#333333',
          neutral: '#FFFFFF',
          'base-100': '#ffff',
          info: '#618cdb',
          success: '#228B22',
          button: '#D2B48C',
          warning: '#f3cb1b',
          error: '#ff3333',
          'base-200': '#f3cb1b',
          'base-300': '#D2B48C',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
