import { createTheme } from "@mui/material/styles";


const colors = {
  blue: "#0057FF",
  blueDark: "#0046CC",
  green: "#17C307",

  white: "#FFFFFF",
  black: "#0F172A",     // headers
  grey: "#64748B",
  lightGrey: "#F8FAFC",

  darkBg: "#0B1220",
  darkPaper: "#111827",
  darkDivider: "rgba(255,255,255,0.08)",
};

export const buildTheme = (mode, language = "en") => {
  const direction = language === "ar" ? "rtl" : "ltr";
  
  return createTheme({
  direction,
  palette: {
    mode,

    primary: {
      main: colors.blue,
      contrastText: colors.white,
    },

    secondary: {
      main: colors.green,
      contrastText: colors.white,
    },

    background: {
      default: mode === "light" ? colors.lightGrey : colors.darkBg,
      paper: mode === "light" ? colors.white : colors.darkPaper,
    },

    text: {
      primary: mode === "light" ? colors.black : "#F9FAFB",
      secondary: mode === "light" ? colors.grey : "#9CA3AF",
    },

    divider: mode === "light" ? "#E5E7EB" : colors.darkDivider,
  },

  typography: {
    fontFamily: language === "ar" 
      ? `"Almarai", "Cairo", "Inter", "Helvetica", "Arial", sans-serif`
      : `"Inter", "Almarai", "Cairo", "Helvetica", "Arial", sans-serif`,

    h1: { fontWeight: 700, letterSpacing: "-0.6px" },
    h2: { fontWeight: 600, letterSpacing: "-0.4px" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },

    body1: {
      lineHeight: 1.7,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.3px",
    },
  },

  shape: {
    borderRadius: 14,
  },

  shadows: mode === "light"
    ? [
        "none",
        "0px 4px 14px rgba(0,0,0,0.05)",
        "0px 6px 20px rgba(0,0,0,0.08)",
        ...Array(22).fill("0px 6px 18px rgba(0,0,0,0.06)"),
      ]
    : [
        "none",
        "0px 4px 14px rgba(0,0,0,0.6)",
        "0px 6px 24px rgba(0,0,0,0.8)",
        ...Array(22).fill("0px 8px 26px rgba(0,0,0,0.9)"),
      ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 24px",
          fontSize: "0.95rem",
          transition: "all 0.25s ease",
        },

        containedPrimary: {
          backgroundColor: colors.blue,
          boxShadow: "0 6px 18px rgba(0,87,255,0.25)",
          "&:hover": {
            backgroundColor: colors.blueDark,
            boxShadow: "0 10px 28px rgba(0,87,255,0.35)",
          },
        },

        containedSecondary: {
          backgroundColor: colors.green,
          boxShadow: "0 6px 18px rgba(23,195,7,0.25)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor:
            mode === "light"
              ? "rgba(255,255,255,0.75)"
              : "rgba(17,24,39,0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: `1px solid ${
            mode === "light" ? "#E5E7EB" : colors.darkDivider
          }`,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.3s ease",
          backgroundImage: "none",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
});
};

