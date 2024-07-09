const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with the entry point of your code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ictf2.js',
    library: 'ictf2',
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
  mode: 'production'
};
