var source = require('vinyl-source-stream')
var browserify = require('browserify')
var gulp = require('gulp')
var rename = require('gulp-rename')
var urify = require('urify-emitter')
var del = require('del')

gulp.task('bundle', function() {
  var bundler = browserify({
  	entries: './index.js',
  	// ignoreTransform: 'urify'
  })
  bundler.plugin(urify, { output: './output/' })
  
  bundler.bundle()
    .pipe(source('index.js'))
    .pipe(rename('bundle-gulp.js'))
    .pipe(gulp.dest('./bundle'))
})

gulp.task('clean', function(cb) {
	del('output/**', cb)
})

gulp.task('default', ['clean', 'bundle'])