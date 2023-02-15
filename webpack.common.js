const path = require('path');

module.exports = {
  target: ['web', 'es2022'],
  entry: {
    desktop: './src/desktop/index.ts',
    config: './src/config/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
    },
    fallback: {
      path: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: { target: 'ESNext' },
      },
    ],
  },
};
