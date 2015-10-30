// ## Import bower dependencies into html
// src/index.html is the entry point of the application
//
// src: wire bower dependencies into src/index.html
// bundle: wire bower dependencies into build/index.html and changes the default bower_components location
// dist: wire bower dependencies into build/index.html
module.exports = function(grunt){
    return {
        src: {
            src: [
                grunt.config('settings.app') + '/index.html'
            ],
            options: {
                directory: grunt.config('settings.bowerdir'),
                exclude: [grunt.config('settings.bowerdir') + '/bootstrap/dist/js']
            }
        },
        bundle: {
            src: [
                grunt.config('settings.dist') + '/index.html'
            ],
            options: {
                directory: grunt.config('settings.dist') + '/' + grunt.config('settings.bowerdir'),
                exclude: [grunt.config('settings.bowerdir') + '/bootstrap/dist/js']
            }
        },
        dist: {
            src: [
                grunt.config('settings.dist') + '/index.html'
            ],
            options: {
                directory: grunt.config('settings.bowerdir'),
                exclude: [grunt.config('settings.bowerdir') +  '/bootstrap/dist/js']
            }
        }
    };
};