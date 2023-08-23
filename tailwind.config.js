module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      textstyle: ["Segoe UI"],
      text: ["Open Sans"],
    },
    extend: {
      fontSize: {
        13: "13px",
        14: "14px",
      },
      backgroundColor: {
        "nav-bg": "#DFDFDF",
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: " #887E7E",
        table:"#E0E0E054"
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
        90: "90px",
        100: "100vh",
      },
      colors: {
        primary: " #887E7E",
        secondary: "#635C5C",
        tertiory: "#635C5C",
        header: "#474747",
        light:" #7C7C7C",
      },
      minHeight: {
        590: "590px",
        55: "55vh",
        "3/4": "75%",
        90: "90vh",
      },
      backgroundImage: {
        "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [],
};
