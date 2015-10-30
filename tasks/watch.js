// ## Task to watch files for changes and runs tasks based on the changed files
module.exports = function(grunt){
    return {
        // when adding a new bower component
        // run the wiredep task to include them in index.html automatically
        bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
        },
        // when modifiying a js file
        // run code linter eslint on new files only
        js: {
            files: [grunt.config('settings.app') + '/**/*.js'],
            tasks: ['injector'],
            options: {
                livereload: grunt.config('settings.lrPort')
            }
        },
        // TODO: check the usefulness of this task
        styles: {
            files: [grunt.config('settings.app') + '/**/*.css'],
            tasks: ['newer:copy:styles'],
            options: {
                livereload: grunt.config('settings.lrPort')
            }
        },
        // when modifying the Gruntfile.js
        // do nothing. This force the user to restart its current task
        gruntfile: {
            files: ['Gruntfile.js']
        },
        // when modifying assets (html, css, images)
        // trigger a page refresh through livereload
        livereload: {
            options: {
                livereload: grunt.config('settings.lrPort')
            },
            files: [
                grunt.config('settings.app') + '/**/*.{html,css}',
                grunt.config('settings.app') + '/**/*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    };
};