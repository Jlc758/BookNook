import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#99c9c5",
    },
    secondary: {
      main: "#ffb703",
    },
    background: {
      default: "#1e6770",
      paper: "#363c4d",
    },
    text: {
      primary: "#ddd1c7",
    },
    error: {
      main: "#1d2c35",
    },
    warning: {
      main: "#ffe526",
    },
    info: {
      main: "#12213d",
    },
    success: {
      main: "#43a892",
    },
    divider: "#ffb703",
  },
});

export default theme;
