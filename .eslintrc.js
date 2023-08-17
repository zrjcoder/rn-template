module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-shadow': 0,
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 90,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        trailingComma: 'es5',
        arrowParens: 'always',
      },
    ],
  },
}
