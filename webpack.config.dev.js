var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  debug:true,
  entry: [
    path.join(__dirname,'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      favicon:path.join(__dirname,'src/favicon.ico'),
      title: "Jackblog react redux版",
      template: path.join(__dirname,'src/index.html'),
      inject: true
    }),
    new ExtractTextPlugin('[hash:8].style.css', { allChunks: true })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, 
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
    //{ test: /\.scss$/,loader: "style!css?sourceMap!sass?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")},
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
  },
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    extensions: ['','.js','.jsx','.scss','.css']
  }
}

