# urify-example

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Examples of [urify-emitter](https://www.npmjs.org/package/urify-emitter) with gulp, grunt, and shell.

There are generally two steps involved. The first is to 'clean' the output directory. The next is to apply the plugin settings so the new files will be emitted.

## transforming entire bundle

By default, this plugin will only affect top-level dependencies. If you want to also apply this plugin to *all* dependencies (e.g. other modules that use `urify` as a transform), you need to globally ignore the `urify` transform and let `urify-emitter` override it.

Until a feature like this lands in browserify, you will need to install the patch:  

```npm install mattdels/node-browserify#transform-ignores -g```

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

Since grunt-browserify always lags behind the latest version of browserify, this plugin will only work on top-level modules. Dependencies that use urify will not be emitted into your output directory. 

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
                //won't work yet..
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

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/urify-example/blob/master/LICENSE.md) for details.
