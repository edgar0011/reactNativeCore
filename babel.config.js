module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ['module-resolver', {
    //   root: ['./src'],
    //   extensions: ['.js', '.ts', '.tsx'],
    // }],
    '@babel/plugin-transform-runtime',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
