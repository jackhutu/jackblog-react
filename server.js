var fs = require('fs')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var serverRender = require('./dist/server.js')

var app = express()
var port = process.env.PORT || 5000
var isDev = process.env.NODE_ENV === 'development'

app.use(express.static(path.join(__dirname, 'dist')))


if (isDev) {
  var config = require('./webpack/webpack.config.dev.client.js')
  var compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot:true,
    inline: true,
    publicPath: config.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
  console.log(config.output.publicPath);
  app.set('views', config.output.publicPath)
  app.set('view engine', 'ejs')
}

app.get('*', function (req, res, next) {
   serverRender.default(req, res);
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})