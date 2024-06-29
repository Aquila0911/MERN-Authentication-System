/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Ubuntu"],
        default: ["Nunito"],
      },
      boxShadow: {
        neon: "",
      },
      colors: {
        
      },
    },
  },

  plugins: [
    plugin(({ theme, addUtilities }) => {
      const neonUtilities = {};
      const colors = theme("colors");

      Object.keys(colors).forEach((color) => {
        const colorValue = colors[color];
        // Ensure colorValue is an object and has the shades we're looking for
        if (
          typeof colorValue === "object" &&
          colorValue["300"] &&
          colorValue["700"]
        ) {
          const color1 = colorValue["300"];
          const color2 = colorValue["700"];
          neonUtilities[`.shadow-neon-${color}`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 15px ${color2}`,
          };
        }
      });
      addUtilities(neonUtilities);
    }),

    // Custom Utilities
    plugin(({ addUtilities }) => {
      const textShadowUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.4)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 6px rgba(0,0,0,0.4)',
        },
        '.text-shadow-lg': {
          textShadow: '0 10px 15px rgba(100,100,100,0.4)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(textShadowUtilities);
    }),
  ],
};
