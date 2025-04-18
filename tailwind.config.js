/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#f9fafb',
        'light-gray': '#e5e7eb',
        'soft-blue': '#60a5fa',
        'text-dark': '#1f2937',
        'accent-gold': '#f59e0b',
        'glass-bg': 'rgba(255, 255, 255, 0.1)', // Glassmorphism background
        'gradient-start': '#60a5fa', // Gradient start color
        'gradient-end': '#a78bfa', // Gradient end color
      },
      spacing: {
        safe: 'env(safe-area-inset-left)', // Add safe spacing for iPhone notches
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.px-safe': {
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.animate-gradient': {
          backgroundSize: '200% 200%',
          animation: 'gradient 15s ease infinite',
        },
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      });
    },
  ],
};