// ## Task to renames files for browser caching purposes
// rename js, css images and fonts files with arbitrary file version
module.exports = function(grunt){
    return {
        dist: {
            src: [
                grunt.config('settings.dist') + '/js/**/*.js',
                grunt.config('settings.dist') + '/css/**/*.css',
                grunt.config('settings.dist') + '/**/*.{png,jpg,jpeg,gif,webp,svg}',
                grunt.config('settings.dist') + '/fonts/*'
            ]
        }
    };
};