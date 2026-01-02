import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMode, selectLanguage } from "@/store/ui/selectors";
import { buildTheme } from "@/theme/theme";
import { useMemo, useEffect } from "react";

export default function ThemeProvider({ children }) {
  const mode = useSelector(selectMode);
  const language = useSelector(selectLanguage);

  const theme = useMemo(() => buildTheme(mode, language), [mode, language]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
