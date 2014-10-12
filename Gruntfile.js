var urify = require('urify-emitter')

module.exports = function(grunt) {

    grunt.initConfig({

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

    })

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-browserify')


    grunt.registerTask('default', ['clean', 'browserify']);

};