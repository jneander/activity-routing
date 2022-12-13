/*
 * For reference:
 * https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
  ],

  globals: {},

  overrides: [
    {
      env: {
        node: true,
      },

      files: ['./.eslintrc.cjs'],
    },

    {
      files: ['./**/*.spec.js', './**/specs/**/*.js'],

      globals: {
        expect: 'writable',
      },
    },
  ],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: ['import', 'promise', 'mocha'],
  root: true,

  rules: {
    'arrow-body-style': 'off',
    'eslint-comments/no-unused-disable': 'error',
    'import/extensions': ['error', 'ignorePackages', {js: 'never'}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'prefer-arrow-callback': 'off',
  },
}
