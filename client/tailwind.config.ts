import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'outline-search': '#7fc1ff',
      },
      backgroundColor: {
        searchBg: '#f1f1f1',
        UserBg: '#767676',
        buttonGreyBg: '#e9e9e9',
        redPinterestBg: '#e60023',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl':
          '0 35px 70px -15px rgba(0, 0, 0, 0.3), 0 20px 20px -10px rgba(0, 0, 0, 0.15)',
        uniform: '0 0 5px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
