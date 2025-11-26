module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
          '.ios.js',
          '.native.js',
          '.android.js',
        ],
        alias: {
          api: './src/api',
          utils: './src/utils',
          hooks: './src/hooks',
          common: './src/common',
          screens: './src/screens',
          services: './src/services',
          constants: './src/constants',
          components: './src/components',
          navigation: './src/navigation',
        },
      },
    ],
    'react-native-worklets/plugin',
    '@babel/plugin-transform-export-namespace-from',
  ],
};
