//@ts-check
import common from './tailwind.config.common.mjs';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  important: '.🐸',
  content: ['./src/lib/**/*.{ts,js,jsx,tsx}', './src/desktop/**/*.{ts,js,jsx,tsx}'],
};
