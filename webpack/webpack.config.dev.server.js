var path = require('path');
var webpack = require('webpack');

module.exports = {
    name: "server-side rendering",
    context: path.join(__dirname, "..", "src"),
    entry: {
      server: ['babel-polyfill','./server']
    },
    target: "node",
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: "server.js",
      publicPath: "/",
      libraryTarget: "commonjs2"
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
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          query: {
            "presets": ["es2015", "react", "stage-0"],
            "plugins":["transform-decorators-legacy","syntax-async-functions"]
          },
          include: path.join(__dirname, '..', 'src'),
          exclude: path.join(__dirname, '/node_modules/')
        },
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
        },
        { test: /\.html$/, loader: 'html-loader' }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "src", "node_modules"
      ]
    }
};
