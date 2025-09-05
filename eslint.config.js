// https://docs.expo.dev/guides/using-eslint/
const {defineConfig,} = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*',],
  },
  {
    rules: {
      'camelcase': 'off',
      'no-console': 'off',
      'linebreak-style': [
        'error',
        'windows',
      ],
      'comma-dangle': [
        'warn',
        {
          'arrays': 'always',
          'objects': 'always',
          'imports': 'never',
          'exports': 'never',
          'functions': 'never',
        },
      ],
      'quotes': [
        'warn',
        'single',
      ],
      'semi': [
        'error',
        'never',
      ],
      'no-unused-vars': [
        'warn',
      ],
      'no-var': [
        'error',
      ],
      'one-var': [
        'off',
      ],
    },
  },
])
