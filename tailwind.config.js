/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "shiny-background": "var(--shiny-background)",
        "border-tint": "var(--border)",
        dark: "var(--dark)",
      },
    },
  },
  plugins: [],
};
