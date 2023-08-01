/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        theme1: {
          "primary": "#db13ba",
          "secondary": "#f4b2df",
          "accent": "#f2ae7b",
          "neutral": "#221a23",
          "base-100": "#e1e5ef",
          "info": "#64aad8",
          "success": "#74eca8",
          "warning": "#f4b31a",
          "error": "#fa0553",
        },
        theme2: {
          "primary": "#db13ba",
          "secondary": "#f4b2df",
          "accent": "#f2ae7b",
          "neutral": "#221a23",
          "base-100": "#34343d",
          "info": "#64aad8",
          "success": "#74eca8",
          "warning": "#f4b31a",
          "error": "#fa0553",
        },
      },
    ],
    darkTheme: "theme2",
    base: true,
    styled: true,
    utils: true,
  }
}
