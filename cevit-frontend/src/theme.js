import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#dbdbe5",
          200: "#b8b7cb",
          300: "#9494b1",
          400: "#717097",
          500: "#4d4c7d",
          600: "#3e3d64",
          700: "#2e2e4b",
          800: "#1f1e32",
          900: "#0f0f19",
        },
        primary: {
          100: "#d7d6e0",
          200: "#afacc0",
          300: "#8683a1",
          400: "#5e5981",
          500: "#363062",
          600: "#2b264e",
          700: "#201d3b",
          800: "#161327",
          900: "#0b0a14",
        },
        greenAccent: {
          100: "#f7f1f3",
          200: "#efe3e7",
          300: "#e8d5db",
          400: "#e0c7cf",
          500: "#d8b9c3",
          600: "#ad949c",
          700: "#826f75",
          800: "#564a4e",
          900: "#2b2527",
        },
        redAccent: {
          100: "#e6e3ea",
          200: "#cdc7d5",
          300: "#b4abc1",
          400: "#9b8fac",
          500: "#827397",
          600: "#685c79",
          700: "#4e455b",
          800: "#342e3c",
          900: "#1a171e",
        },
        blueAccent: {
          100: "#e6e3ea",
          200: "#cdc7d5",
          300: "#b4abc1",
          400: "#9b8fac",
          500: "#827397",
          600: "#685c79",
          700: "#4e455b",
          800: "#342e3c",
          900: "#1a171e",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#fdfcff",
          200: "#fbf8ff",
          300: "#f8f5ff",
          400: "#f6f1ff",
          500: "#f4eeff",
          600: "#c3becc",
          700: "#928f99",
          800: "#625f66",
          900: "#313033",
        },
        greenAccent: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#edeff9",
          200: "#dbe0f3",
          300: "#cad0ed",
          400: "#b8c1e7",
          500: "#a6b1e1",
          600: "#858eb4",
          700: "#646a87",
          800: "#42475a",
          900: "#21232d",
        },
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
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
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
