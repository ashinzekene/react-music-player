const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/music-player',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new LiveReloadPlugin({
      appendScriptTag: true,
      auto: false,
      delay: 500,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      options: {
        publicPath: '/music-player',
      },
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
