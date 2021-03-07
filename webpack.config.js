const path = require('path');
const glob = require('glob');
const express = require('express');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const __webpack = require('webpack');

module.exports = () => {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  const entry = {
    app: './src/index.ts',
    background: './background/index.ts',
    content: './content/index.ts',
  };

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: '.',
      excludeChunks: ['tests', 'background', 'content'],
    }),
    new CopyPlugin([{ from: 'public', to: 'public' }]),
  ];

  // Include tests in development builds
  if (!IS_PRODUCTION) {
    entry.tests = glob.sync('./tests/**/*.test.js');

    plugins.push(
      new HtmlWebpackPlugin({
        filename: 'tests/index.html',
        template: './tests/index.html',
        inject: 'head',
        chunks: ['tests'],
      })
    );
  }

  /**@type{__webpack.Configuration} */
  const cfg = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    entry,
    devtool: 'inline-nosources-cheap-source-map',
    plugins,
    module: {
      rules: [
        {
          test: /\.(js|mjs|ts)$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      writeToDisk: true,
      before: function (app, _server, _compiler) {
        app.use(express.static(path.join(__filename, '..', 'tests', 'demo-pages')));
      },
    },
  };
  return cfg;
};
