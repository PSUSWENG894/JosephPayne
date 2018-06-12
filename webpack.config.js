const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['phaser']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './build',
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  
  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'build')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    
    new webpack.DefinePlugin({
        'typeof CANVAS_RENDERER': JSON.stringify(true),
        'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
  ]
}