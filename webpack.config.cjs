const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, 'src', 'frontend', 'index.js'),
  output: {
    path: resolve(__dirname, 'dist', 'frontend'),
  },
};
