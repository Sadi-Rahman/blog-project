// File: frontend/utils/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#1976D2",
    },
    text: {
      primary: "#212121",
      secondary: "#555555",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0, // square edges on AppBar
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 28, // use dense variant (48px height)
      },
      styleOverrides: {
        root: {
          minHeight: 28, // enforce minimum height
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F7FA",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "16px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#212121",
        },
      },
    },
  },
});

export default theme;
