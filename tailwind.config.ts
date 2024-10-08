import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-focus': '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
        'profile-preview': '0px 0px 32px 0px rgba(0, 0, 0, 0.10)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'sm': { 'max': '600px' },
      'md': { 'max': '700px' },
      'tb': {'max': '1100px'},
      'fp': {'min': '601px'},
      'ls': {'min': '501px'},
      'mt': {'min': '701px'},
    }
  },
  plugins: [],
};
export default config;
