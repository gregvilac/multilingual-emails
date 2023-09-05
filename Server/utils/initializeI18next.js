const Backend = require("i18next-fs-backend");
const i18next = require("i18next");

function initializei18next(usersLanguage) {
  console.log("initialize");
  console.log(__dirname);
  i18next.use(Backend).init({
    fallbackLng: "en",
    lng: usersLanguage,
    initImmediate: false,
    interpolation: {
      escapeValue: true,
      formatSeparator: ",",
    },
    backend: {
      loadPath: __dirname + "/i18n/{{lng}}/translations.json",
    },
  });
}

module.exports = initializei18next;
