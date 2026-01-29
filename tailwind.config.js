/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            animation: {
                marquee: 'marquee var(--duration, 30s) linear infinite'
            },
            keyframes: {
                marquee: {
                    to: { transform: 'translateX(-50%)' }
                }
            }
        },
    },
    plugins: [],
};
