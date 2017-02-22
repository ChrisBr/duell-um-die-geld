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
          }
        ],
      }
    },
    build: {
        // configuration for this build
    },
    dev: {

    },
  });

  grunt.loadNpmTasks('grunt-webpack');
};
