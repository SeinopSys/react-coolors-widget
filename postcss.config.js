module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('postcss-modules')({
      generateScopedName: '[local]-[hash:base64:8]',
      localsConvention: 'camelCaseOnly',
      getJSON: () => undefined,
    }),
  ],
};
