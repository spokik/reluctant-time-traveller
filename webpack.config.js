const path = require('path')
const HTMLWebpackPlugin = require(`html-webpack-plugin`)
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports ={
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new HTMLWebpackPlugin({
      template:'./src/game.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 4200
  }
}