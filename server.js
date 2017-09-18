var path = require('path')
var express = require('express')
var serverRender = require('./dist/server.js')
var favicon = require('serve-favicon')

var app = express()
var isDev = process.env.NODE_ENV === 'development'
var defaultPort = isDev? 3000 : 8300
var port = process.env.PORT || defaultPort

app.use(express.static(path.join(__dirname, 'dist')))
if (isDev) {
  var config = require('./webpack/webpack.config.dev.client.js')
  var compiler = require('webpack')(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    hot:true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}else{
  app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))
  app.set('views', path.join(__dirname, 'dist'))
  app.set('view engine', 'ejs')
}

app.get('*', function (req, res, next) {
  serverRender.default(req, res)
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})