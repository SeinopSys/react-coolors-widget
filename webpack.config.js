const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react/jsx-runtime': true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    library: 'CoolorsWidget',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    clean: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'widget.css' }),
  ],
};
