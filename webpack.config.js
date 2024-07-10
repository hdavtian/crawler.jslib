const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with the entry point of your code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ictf.js',
    library: 'ictf',
    libraryTarget: 'umd2',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'production',
  externals: {
    '$': 'jQuery',
    'jquery': 'jQuery',
    'jquery-ui': 'jquery-ui/jquery-ui.js',
    'webpack-jquery-ui': 'webpack-jquery-ui'
  },
};
