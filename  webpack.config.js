const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env,argv) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true
  const isDevelopment = argv.mode === 'development';

  return {
    entry: {
      main: './src/index.js',
     // Runtime code for hot module replacement
      hot: 'webpack/hot/dev-server.js',
     // Dev server client for web socket transport, hot and live reload logic
     client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    output: {
      filename: 'index_bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: argv.mode,
    devtool: isDevelopment
        ? '#eval-source-map'
        : 'source-map',
    devServer: {
      hot: true,
      static: './dist',
      stats: {
        children: false,
        maxModules: 0 
    },
      port: 5009 
    },
    module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader"
              },
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
    plugins: [
      new HtmlWebpackPlugin({
          template: "./index.html"
      }),
      new CopyWebpackPlugin([{
        from: './*.html'
      }]),
      "react-hot-loader/babel"
  ]
  };
};