import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { storage } from "@/utils/storage";

// Get initial language from storage or default to "en"
const savedLanguage = storage.get("language", "en");

i18n
  .use(HttpBackend) // load json files
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: savedLanguage,
    debug: import.meta.env.DEV, // show warnings in dev mode
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: "/locale/{{lng}}/translate.json", 
    },
  });

export default i18n;
