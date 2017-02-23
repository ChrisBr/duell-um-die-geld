//webpack = require("webpack");
module.exports = function(grunt) {

  grunt.config.set('webpack', {
    options: {
      entry: "./assets/js/app.js",
      output: {
          path: ".tmp/public/js/webpack/",
          filename: "[hash].js",
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"],
          },
          {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader" ],
          },
          // {
          //   test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
          //   loader: 'file-loader'
          // },
          {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader?name=public/fonts/[name].[ext]'
          }
        ],
      },
    },
    build: {
        // configuration for this build
    },
    dev: {

    },
  });

  grunt.loadNpmTasks('grunt-webpack');
};
