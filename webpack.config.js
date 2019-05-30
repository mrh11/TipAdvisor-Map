const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, 'client/dist')

module.exports = {
  entry: `${SRC_DIR}/App.jsx`,

  output: {
    path: `${DIST_DIR}`,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: [/\.db$/,/\.sql$/],
        loader: 'babel-loader'
      }
    ]
  }
};