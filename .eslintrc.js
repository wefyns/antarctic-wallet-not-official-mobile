module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier'],
  plugins: [
    'react',
    'import',
    'jsx-a11y',
    'prettier',
    'react-hooks',
    'react-native',
    'unused-imports',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'global-require': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'consistent-return': 'off',
    'react/jsx-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unsafe-optional-chaining': 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': 'off',
    'react/function-component-definition': 'off',
    'no-constructor-return': 'off',
    'no-underscore-dangle': 'off',
    'react/no-unstable-nested-components': 'off',
    'default-param-last': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unused-class-component-methods': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      { usePrettierrc: true },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'api',
          'utils',
          'hooks',
          'config',
          'assets',
          'screens',
          'services',
          'constants',
          'components',
          'navigation',
        ],
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: [
          '.js',
          '.jsx',
          '.d.ts',
          '.json',
          '.ts',
          '.tsx',
          '.native.js',
        ],
      },
    },
  },

  overrides: [],
};