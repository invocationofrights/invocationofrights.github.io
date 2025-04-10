// tailwind.config.js
// const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('@tailwindcss/typography')],

    theme: {
        extend: {},
    }
};
