const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  name: 'browser',
  context: path.join(__dirname, '..','src'),
  entry: {
    vendor: ['react','redux','react-redux','react-router-redux','react-router-dom','react-router-config'],
    bundle: ['./client.js',hotMiddlewareScript]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __DEVTOOLS__: false,
      __DEVLOGGER__: true,
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity //Infinity
    }),    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ 
      filename: 'style.css', 
      disable: false, allChunks: true 
    }),    
  ],
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$|\.jsx$/, exclude: /node_modules/, use: ['eslint-loader'] },
      { 
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        include: path.join(__dirname,'..','src'),
        exclude: /node_modules/
      },
      { 
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[hash:8].[name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[hash:8].[name].[ext]'
          }
        }]
      },      
      { test: /\.json$/, use: ['json-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js','.jsx','.scss','.css'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      actions: path.resolve(__dirname, '../src/actions'),
      reducers: path.resolve(__dirname, '../src/reducers'),
      api: path.resolve(__dirname, '../src/api'),
      assets: path.resolve(__dirname, '../src/assets'),
      utils: path.resolve(__dirname, '../src/utils'),
    }    
  }
}