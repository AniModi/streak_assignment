/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#1E1E1E",
          medium: "#141419",
          dark: "#0F0F0F",
        },
        positive: "#2E7F4E",
        "positive-light": "#2E5F4EA0",
        negative: "#8F2C40",
        "negative-light": "#6D2C40A0",
        "transparent-white": "#FFFFFFA0",
      },
      screens: {
        mobile: { max: "768px" },
        smallLaptop: { max: "1024px" },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const sizes = {
        icon: "1.5rem",
        "icon-small": "0.8rem",
        "icon-large": "2rem",
      };

      const newUtilities = Object.entries(sizes).reduce((acc, [key, size]) => {
        acc[`.${key}`] = {
          height: size,
          width: size,
          fill: "white",
          stroke: "white",
        };
        acc[`.${key} *`] = {
          height: size,
          width: size,
          fill: "white",
          stroke: "white",
        };
        return acc;
      }, {});

      addUtilities(newUtilities);
    },
  ],
};
