// File: frontend/pages/_app.js

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../utils/theme";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <CssBaseline /> <Component {...pageProps} />
    </ThemeProvider>
  );
}
