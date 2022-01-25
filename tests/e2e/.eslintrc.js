module.exports = {
  plugins: ["cypress"],
  env: {
    mocha: true,
    jest: true,
    "cypress/globals": true,
  },
  rules: {
    strict: "off",
  },
};
