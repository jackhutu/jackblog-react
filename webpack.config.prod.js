var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  entry: [
    //'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.join(__dirname,'src/template.html'),  //模板文件
      inject:'body'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: path.join(__dirname,'src')
    }, 
    { test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap&includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib") ) },
    // {
    //   test: /\.(css|scss)$/,
    //   loader: "style!css!sass?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
    //   include: __dirname
    // }
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url?limit=10000&name=images/[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    }

    ]
  }
}

