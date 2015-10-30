// ## Task to add automatically application sources under /src/modules into index.html
// lineEnding is a necessary option to make usemin work with injector
module.exports = function(grunt){
    return {
        options: {
            addRootSlash: false,
            relative: true,
            lineEnding: grunt.util.linefeed
        },
        src: {
            options: {
                template: grunt.config('settings.app') + '/index.html',
                destFile: grunt.config('settings.app') + '/index.html'
            },
            files: {
                src : [
                    grunt.config('settings.app') + '/modules/app.module.js',
                    grunt.config('settings.app') + '/modules/**/*.module.js',
                    grunt.config('settings.app') + '/modules/**/*.js',
                    grunt.config('settings.app') + '/assets/**/*.css'
                ]
            }
        },
        bundle: {
            options: {
                template:  grunt.config('settings.dist') + '/index.html',
                destFile:  grunt.config('settings.dist') + '/index.html'
            },
            files: {
                src: [
                    grunt.config('settings.dist') + '/modules/app.module.js',
                    grunt.config('settings.dist') + '/modules/**/*.module.js',
                    grunt.config('settings.dist') + '/modules/**/*.js',
                    grunt.config('settings.app') + '/assets/**/*.css'
                ]
            }
        },
        dist: {
            options: {
                template:  grunt.config('settings.app') + '/index.html',
                destFile:  grunt.config('settings.dist') + '/index.html'
            },
            files: {
                src: [
                    grunt.config('settings.app') + '/modules/app.module.js',
                    grunt.config('settings.app') + '/modules/**/*.module.js',
                    grunt.config('settings.app') + '/modules/**/*.js',
                    grunt.config('settings.app') + '/assets/**/*.css'
                ]
            }
        }
    };
};