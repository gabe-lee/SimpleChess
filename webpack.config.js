const path = require('path');

module.exports = {
  entry: ".client/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './client/dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};