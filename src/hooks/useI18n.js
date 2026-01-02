import { useEffect } from "react";
import { useSelector } from "react-redux";
import i18n from "@/i18n";

/**
 * Hook to sync i18n language with Redux state
 */
export function useI18n() {
  const language = useSelector((state) => state.ui.language);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return i18n;
}

