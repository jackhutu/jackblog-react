const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = [
  {
    name: 'browser',
    devtool: 'hidden-source-map',
    context: path.join(__dirname, '../'),
    entry: {
      vendor: ['react','redux','react-redux','react-router-redux','react-router-dom','react-router-config'],
      bundle: './src/client.js'
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: '[hash:8].[name].js',
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        __DEVTOOLS__: false,
        __DEVLOGGER__: false,
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new UglifyJSPlugin({
        compress: { warnings: false }
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity //Infinity
      }),
      new ExtractTextPlugin({ 
        filename: '[hash:8].style.css', 
        disable: false, allChunks: true 
      }),       
      new HtmlWebpackPlugin({
        favicon:path.join(__dirname,'../src/favicon.ico'),
        title: 'Jackblog react 版',
        template: path.join(__dirname,'../src/index.html'),
        filename: 'index.ejs',
        inject:'body',
        htmlContent:'<%- __html__ %>',
        initialData:'window.__INITIAL_STATE__ = <%- __state__ %>',
        styleMode:'<%- __styleMode__ %>',
        baiduappkey: process.env.BAIDU_TONGJI_APPKEY,
        hash:false,    //为静态资源生成hash值
        minify:{    //压缩HTML文件
          removeComments:false,    //移除HTML中的注释
          collapseWhitespace:false    //删除空白符与换行符
        }
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
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '../'),
    target: 'node',
    entry: {
      server: ['babel-polyfill','./src/server']
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'server.js',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new UglifyJSPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.IgnorePlugin(/vertx/),
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
]