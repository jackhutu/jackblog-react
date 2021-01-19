const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'server-side rendering',
  context: path.join(__dirname, '../'),
  target: 'node',
  entry: {
    server: ['babel-polyfill','./src/server.js']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.IgnorePlugin(/vertx/)
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
      { test: /\.json$/, loader: 'json-loader' },
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
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