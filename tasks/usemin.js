// ## Task to preforms rewrite
// Performs rewrites based on filerev and the useminPrepare configuration on html and css files
module.exports = function(grunt){
    return {
        html: [grunt.config('settings.dist') + '/**/*.html'],
        css: [grunt.config('settings.tmp') + '/**/*.css'],
        options: {
            assetsDirs: [grunt.config('settings.dist')]
        }
    };
};