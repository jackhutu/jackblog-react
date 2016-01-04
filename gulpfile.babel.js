import path from 'path'
import gulp from 'gulp'
import gutil from 'gulp-util'
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"
import del from 'del'
import env from 'gulp-env'
import gulpSequence from 'gulp-sequence'

gulp.task('serve', cb =>{
  let webpackConfig = require('./webpack.config')
  let myConfig = Object.create(webpackConfig)
  myConfig.debug = true
  new WebpackDevServer(webpack(myConfig), {
      noInfo: true,
      hot: true,
      //inline: true,
      publicPath: myConfig.output.publicPath,
      stats: {
        colors: true
      }
  }).listen(5000, "localhost", err => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "==> 🌎  http://localhost:5000/webpack-dev-server/index.html")
  });
})

gulp.task('clean', cb => del([path.join(__dirname, '/dist/*')]))

gulp.task('set-env-prod', ()=>{
  env({
    vars: {
      'NODE_ENV':'production'
    }
  })
})

gulp.task('webpack', cb => {
  let webpackConfig = require('./webpack.config')
  webpack(webpackConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log("[webpack]", stats.toString({
          // output options
      }))
      cb()
  })
})

gulp.task('webpack:dist',gulpSequence('set-env-prod','webpack'))


gulp.task('build', gulpSequence('clean','webpack:dist'))





// gulp.task("webpack-dev-server", function(callback) {
//   // modify some webpack config options
//   var myConfig = Object.create(webpackConfig);
//   myConfig.devtool = "eval";
//   myConfig.debug = true;

//   // Start a webpack-dev-server
//   new WebpackDevServer(webpack(myConfig), {
//     publicPath: "/" + myConfig.output.publicPath,
//     stats: {
//       colors: true
//     }
//   }).listen(8080, "localhost", function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//   });
// });




// import del from "del";
// import path from "path";
// import gulp from "gulp";
// import open from "open";
// import gulpLoadPlugins from "gulp-load-plugins";
// import packageJson from "./package.json";
// import runSequence from "run-sequence";
// import webpack from "webpack";
// import webpackConfig from "./webpack.config";
// import WebpackDevServer from "webpack-dev-server";


// const PORT = process.env.PORT || 3000;
// const $ = gulpLoadPlugins({camelize: true});


// // Main tasks
// gulp.task('serve', () => runSequence('serve:clean', 'serve:index', 'serve:start'));
// gulp.task('dist', () => runSequence('dist:clean', 'dist:build', 'dist:index'));
// gulp.task('clean', ['dist:clean', 'serve:clean']);
// gulp.task('open', () => open('http://localhost:3000'));

// // Remove all built files
// gulp.task('serve:clean', cb => del('build', {dot: true}, cb));
// gulp.task('dist:clean', cb => del(['dist', 'dist-intermediate'], {dot: true}, cb));

// // Copy static files across to our final directory
// gulp.task('serve:static', () => 
//   gulp.src([
//     'src/static/**'
//   ])
//     .pipe($.changed('build'))
//     .pipe(gulp.dest('build'))
//     .pipe($.size({title: 'static'}))
// );

// gulp.task('dist:static', () => 
//   gulp.src([
//     'src/static/**'
//   ])
//     .pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'static'}))
// );

// // Copy our index file and inject css/script imports for this build
// gulp.task('serve:index', () => {
//   return gulp
//     .src('src/index.html')
//     .pipe($.injectString.after('<!-- inject:app:js -->', '<script src="generated/main.js"></script>'))
//     .pipe(gulp.dest('build'));
// });

// // Copy our index file and inject css/script imports for this build
// gulp.task('dist:index', () => {
//   const app = gulp
//     .src(["*.{css,js}"], {cwd: 'dist-intermediate/generated'})
//     .pipe(gulp.dest('dist'));

//   // Build the index.html using the names of compiled files
//   return gulp.src('src/index.html')
//     .pipe($.inject(app, {
//       ignorePath: 'dist',
//       starttag: '<!-- inject:app:{{ext}} -->'
//     }))
//     .on("error", $.util.log)
//     .pipe(gulp.dest('dist'));
// });

// // Start a livereloading development server
// gulp.task('serve:start', ['serve:static'], () => {
//   const config = webpackConfig(true, 'build', PORT);

//   return new WebpackDevServer(webpack(config), {
//     contentBase: 'build',
//     publicPath: config.output.publicPath,
//     watchDelay: 100
//   })
//     .listen(PORT, '0.0.0.0', (err) => {
//       if (err) throw new $.util.PluginError('webpack-dev-server', err);

//       $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
//     });
// });

// // Create a distributable package
// gulp.task('dist:build', ['dist:static'], cb => {
//   const config = webpackConfig(false, 'dist-intermediate');

//   webpack(config, (err, stats) => {
//     if (err) throw new $.util.PluginError('dist', err);

//     $.util.log(`[${packageJson.name} dist]`, stats.toString({colors: true}));

//     cb();
//   });
// });
