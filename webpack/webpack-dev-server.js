var Express = require('express')
var webpack = require('webpack')
var path = require('path')

//var config = require('../src/config');
var webpackConfig = require('../webpack.config.dev')
var compiler = webpack(webpackConfig)

var host = 'localhost'
var port = process.env.PORT || 5000
var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

var app = new Express();

app.use(require("webpack-dev-middleware")(compiler, serverOptions));
//app.use(require('webpack-dev-middleware')(compiler, serverOptions));
//app.use(require('webpack-hot-middleware')(compiler));
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, heartbeat: 10 * 1000
}))


// app.get("/*", function(req, res) {
//   return res.sendFile(path.join(__dirname , '../dist/index.html'))
// })

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
