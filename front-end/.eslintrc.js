module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  globals: {
    module: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
