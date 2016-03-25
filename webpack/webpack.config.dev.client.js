var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  devtool: 'eval-source-map',
  name: 'browser',
  //context: path.join(__dirname, "../src"),
  debug:true,
  entry: [
    path.join(__dirname, "../src/client.js"),
    hotMiddlewareScript
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   favicon:path.join(__dirname,'../src/favicon.ico'),
    //   title: "Jackblog react redux版",
    //   template: path.join(__dirname,'../src/index.html'),
    //   filename: 'index.ejs',
    //   inject:'body',
    //   htmlContent:'<%- __html__ %>',
    //   initialData:'window.__INITIAL_STATE__ = <%- __state__ %>',
    //   hash:false,    //为静态资源生成hash值
    //   minify:{    //压缩HTML文件
    //     removeComments:false,    //移除HTML中的注释
    //     collapseWhitespace:false    //删除空白符与换行符
    //   }
    // }),
    //new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    loaders: [{
     test: /\.js$|\.jsx$/,
     loader: 'babel',
      query: {
        "presets": ["es2015", "react", "stage-0"],
        "plugins":["transform-decorators-legacy"]
      },
      include: path.join(__dirname, '../src'),
      exclude: path.join(__dirname, '/node_modules/')
    }, 
    { test: /\.css$/, loader: 'style!css?sourceMap'},
    { test: /\.json$/, loader: "json-loader" },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url?limit=10000&name=[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=[hash:8].[name].[ext]'
    }]
  },
  resolve: {
    extensions: ['','.js','.jsx','.scss','.css']
  }
}

