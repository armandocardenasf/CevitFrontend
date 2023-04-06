import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: "#FCB415",
        secondary: "#471827",
        lightSecondary: "#8B435A",
        dark: "#2A2B2A",
        yellow: "#FCDA00",
        white: "#FFFFFF",
        grey: "#333333",
      }
    : {
        primary: "#FCB415",
        secondary: "#471827",
        lightSecondary: "#8B435A",
        dark: "#2A2B2A",
        yellow: "#FCDA00",
        white: "#FFFFFF",
        grey: "#333333",
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
            wine: {
              main: colors.lightSecondary,
            },
            yellow: {
              main: colors.yellow,
            },
            neutral: {
              dark: colors.dark,
              main: colors.yellow,
              light: colors.lightSecondary,
            },
            background: {
              default: "#2A2B2A",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
            wine: {
              main: colors.lightSecondary,
            },
            yellow: {
              main: colors.yellow,
            },
            neutral: {
              dark: colors.dark,
              main: colors.yellow,
              light: colors.lightSecondary,
            },
            background: {
              default: "#e9e9e9",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
