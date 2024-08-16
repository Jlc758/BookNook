const Theme = {
  focusRing: "auto", // or 'always', 'never'
  scale: 1, // Adjust as needed
  fontSmoothing: true, // Adjust as needed
  white: "#ffffff", // Set your specific color
  black: "#000000", // Set your specific color
  colors: {
    "faded-green": [
      "#f3f7f4",
      "#e6ebe7",
      "#c8d6cd",
      "#a8c1af",
      "#8dae97",
      "#7ba386",
      "#719d7d",
      "#60886c",
      "#537a5e",
      "#446a4f",
    ],
    yellow: [
      "#fdfce5",
      "#f8f6d3",
      "#f0ecaa",
      "#e7e17c",
      "#e0d957",
      "#dbd33e",
      "#d9d02f",
      "#c0b820",
      "#aaa316",
      "#938c03",
    ],
  }, // Define your MantineThemeColors here
  primaryShade: { light: 6, dark: 8 }, // or a single number, e.g., 6
  primaryColor: "yellow", // Default color
  variantColorResolver: function () {}, // Implement the function as needed
  autoContrast: false, // Adjust as needed
  luminanceThreshold: 0.3, // Adjust as needed
  fontFamily: "Roboto, sans-serif", // Adjust as needed
  fontFamilyMonospace: "Monaco, monospace", // Adjust as needed
  headings: {
    fontFamily: "Roboto, sans-serif", // Adjust as needed
    fontWeight: "normal", // Adjust as needed
    textWrap: "wrap", // or 'nowrap', 'balance', etc.
    sizes: {
      h1: {}, // Define HeadingStyle
      h2: {}, // Define HeadingStyle
      h3: {}, // Define HeadingStyle
      h4: {}, // Define HeadingStyle
      h5: {}, // Define HeadingStyle
      h6: {}, // Define HeadingStyle
    },
  },
  radius: {}, // Define MantineRadiusValues
  defaultRadius: "sm", // or any valid CSS value
  spacing: {}, // Define MantineSpacingValues
  fontSizes: {}, // Define MantineFontSizesValues
  lineHeights: {}, // Define MantineLineHeightValues
  breakpoints: {}, // Define MantineBreakpointsValues
  shadows: {}, // Define MantineShadowsValues
  respectReducedMotion: false, // Adjust as needed
  cursorType: "default", // or 'pointer'
  defaultGradient: {}, // Define MantineGradient
  activeClassName: "active-class", // Adjust as needed
  focusClassName: "focus-class", // Adjust as needed
  components: {}, // Define MantineThemeComponents
  other: {}, // Define MantineThemeOther as needed
};

export default Theme;
