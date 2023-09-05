import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      //Use double curly brackets to "dynamically" tell the code where to find the translation files.
      loadPath: "/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    debug: false,
    //All folders containing translations need to go here.
    ns: ["common"],
    interpolation: {
      escapeValue: true,
      formatSeparator: ",",
    },
    react: {
      // wait: true,
    },
  });

export default i18n;
