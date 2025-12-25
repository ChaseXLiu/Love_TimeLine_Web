import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          bg: '#fff1f2', // rose-50
          primary: '#fb7185', // rose-400
          text: '#44403c', // stone-700
        },
      },
    },
  },
  plugins: [],
};
export default config;
