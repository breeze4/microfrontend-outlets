const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../../static-asset-server/mfes/pages/dashboard/common/root/dashboard-landing'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: true,
    alias: {
      '@mfe/types': path.resolve(__dirname, '../shared/types/src'),
      '@mfe/angular-shared': path.resolve(__dirname, '../shared/angular-shared/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
