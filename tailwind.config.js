const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        0: "0",
        1: "1",
        9999: "9999",
      },
    },
  },
  plugins: [],
});
