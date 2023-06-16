module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 80,
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
