# urify-example

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Examples of urify-emitter with gulp, grunt, and shell.

There are generally two steps involved. The first is to 'clean' the output directory. The next is to apply the plugin settings so the new files will be emitted.

By default, applying the plugin will only affect top-level dependencies. If you want to also apply this plugin to *all* dependencies (e.g. modules within modules), you need to globally ignore the `urify` transform and let `urify-emitter` override it.

## gulp

```js
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var emitter = require('urify-emitter')
var del = require('del')

gulp.task('bundle', function() {
  var bundler = browserify({
  	entries: './index.js',
  	ignoreTransform: 'urify' //ignore urify on all dependencies
  })
  bundler.plugin(emitter, { output: 'output' })
  
  bundler.bundle()
    .pipe(source('index.js'))
    .pipe(rename('bundle-gulp.js'))
    .pipe(gulp.dest('./bundle'))
})

gulp.task('clean', function(cb) {
	del('output/**', cb)
})
```

## grunt

Since grunt-browserify lags behind the latest version of browserify, this plugin will only work on top-level modules. Dependencies that use urify will not be emitted into your output directory. 

```js
   // inside grunt config 

    clean: ['output/**'],

    browserify: {
        options: {
            preBundleCB: function(b) {
                b.plugin(urify, {
                    output: 'output'
                });
            },
            browserifyOptions: {
                //Will not work until grunt-browserify updates to latest browserify
                ignoreTransform: 'urify'
            }
        },
        bundle: {
            src: './index.js',
            dest: 'bundle/bundle-grunt.js'
        },
    }
```

## shell

From command line or `npm run scripts`, you can use the `-p` argument like so:  

```sh
#top-level emitter only
browserify index.js -p [ urify-emitter -o images ] > bundle/bundle.js

#emit all datauris in bundle, with a limit of 1024 bytes
browserify index.js -p [ urify-emitter -o output -l 1024 ] --it urify > bundle/bundle.js 
```

This project includes a clean & bundle step already in the `package.json`, so you can just run:

```npm run build```

## Usage

[![NPM](https://nodei.co/npm/urify-example.png)](https://nodei.co/npm/urify-example/)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/urify-example/blob/master/LICENSE.md) for details.
