import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: "#FFFFFF", //
        secondary: "#630021", //
        lightSecondary: "#7D2248", //
        dark: "#231F20",
        yellow: "#FFCD00", //
        white: "#FFFFFF", //
        grey: "#75787b",
        wine: "#7D2248", //
        redWine: "#630021", //
      }
    : {
        primary: "#FFFFFF",
        secondary: "#630021",
        lightSecondary: "#7D2248",
        dark: "#231F20",
        yellow: "#FFCD00",
        white: "#FFFFFF",
        grey: "#75787b",
        wine: "#7D2248",
        redWine: "#630021",
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
              default: "#ededed",
            },
          }),
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
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
  const [mode, setMode] = useState("light");

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
