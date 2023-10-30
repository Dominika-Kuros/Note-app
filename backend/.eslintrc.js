module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
