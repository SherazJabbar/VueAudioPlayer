module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
    pwa: {
      name: "Music App",
      themeColor: "#ff5e3a",
      manifestOptions: {
        short_name: "Music",
      },
    },
  },
};
