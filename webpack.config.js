const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
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
    /* alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
    }, */
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'widget.css' }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/*.scss',
          to: 'styles.scss',
          transformAll(assets) {
            const concatenatedAssets = assets.reduce((accumulator, asset) => {
              const content = asset.data.toString().replace(/@import ([^\n]+)\n/g, '').trim();

              return `${accumulator}${content}\n\n`;
            }, '').trim();
            return `${concatenatedAssets}\n`;
          },
        },
      ],
    }),
  ],
};
