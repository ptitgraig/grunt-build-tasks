// ## Task to prepare concatenation and minification
// It create in memory the following task:
//      - concat: to concatenate file
//      - uglifyjs: to minify js
//      - cssmin: to minify css
// It reads HTML for usemin blocks to enable smart builds that automatically concat, minify and revision files
// It creates configurations in memory so additional tasks can operate on them
module.exports = function(grunt){
    return {
        html: grunt.config('settings.dist') + '/index.html',
        options: {
            dest: grunt.config('settings.dist'),
            staging: grunt.config('settings.tmp'),
            flow: {
                html: {
                    steps: {
                        js: ['concat', 'uglifyjs'],
                        css: ['concat', 'cssmin']
                    },
                    post: {}
                }
            }
        }
    };
};