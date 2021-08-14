module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('postcss-modules')({
      // Equivalent to camelCaseOnly transformation, somehow this is necessary for webpack to be able to understand the references
      generateScopedName: name => name.replace(/([a-z\d])[^a-z\d]+([a-z\d])/ig, (_, m1, m2) => m1 + (m2.toUpperCase())),
      localsConvention: 'camelCaseOnly',
      getJSON: () => undefined,
    }),
  ],
};
