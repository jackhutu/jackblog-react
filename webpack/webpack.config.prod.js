var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    name: "browser",
    devtool: "source-map",
    context: path.join(__dirname, "../"),
    entry: {
      vendor: ['react','redux','react-redux','react-router'],
      bundle: './src/client.js'
    },
    output: {
      path: './dist',
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
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        //filename:"vendor.js",
        minChunks: Infinity //Infinity
      }),
      new ExtractTextPlugin('[hash:8].style.css', { allChunks: true }),
      new HtmlWebpackPlugin({
        favicon:path.join(__dirname,'../src/favicon.ico'),
        title: "Jackblog react 版",
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
      preLoaders: [
        { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
      ],
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-0"],
          "plugins":["transform-decorators-legacy"]
        },
        exclude: /node_modules/,
        include: path.join(__dirname,'../src')
      }, 
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },{
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }]
    },
    eslint: {
      configFile: path.join(__dirname, '../.eslintrc.json')
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "src", "node_modules"
      ]
    }
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "../"),
    target: "node",
    entry: {
      server: ['babel-polyfill','./src/server']
    },
    output: {
      path: './dist',
      filename: "server.js",
      publicPath: "/",
      libraryTarget: "commonjs2"
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
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
      preLoaders: [
        { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
      ],
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          query: {
            "presets": ["es2015", "react", "stage-0"],
            "plugins":["transform-decorators-legacy","syntax-async-functions"]
          },
          include: path.join(__dirname, '..', 'src'),
          exclude: /node_modules/,
        },
        { test: /\.json$/, loader: "json-loader" },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
            'url?limit=10000&name=images/[hash:8].[name].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
        }
      ]
    },
    eslint: {
      configFile: path.join(__dirname, '../.eslintrc.json')
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "src", "node_modules"
      ]
    }
  }
]