/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- CORRECTED CONTENT ARRAY ---
  content: [
    "./templates/**/*.html", // Tells Tailwind to scan ALL your HTML files
    "./static/**/*.js",      // Tells Tailwind to scan your JS for classes (theme.js)
  ],
  // --- DARK MODE ENABLER ---
  darkMode: 'class', // Enables the light/dark switching logic based on the 'dark' class
  theme: {
    extend: {},
  },
  plugins: [],
}