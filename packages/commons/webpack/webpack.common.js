const path = require('path');
const DotEnv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.ts'),
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, '..', './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: false,
    port: 'auto',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-transform-react-jsx-source',
                'babel-plugin-styled-components',
              ],
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // this line will be used for images formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'public/resource',
      },
      // this line will be use for fonts and svg files
      {
        test: /\.(woff(2)?|eot|tff|otf|svg|)$/,
        use: ['file-loader?name=[name].[ext]'],
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js'],
  },
  plugins: [new DotEnv()],
};
