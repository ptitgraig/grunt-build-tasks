// ## Task to alters url paths in css files
// Use the file `assets.json` produced by `filerev_assets` as a map
// to alter url path in css files accordingly
module.exports = function(grunt){
    return {
        options: {
            assets: grunt.config('settings.tmp') + '/assets/assets.json'
        },
        dist: {
            src: [grunt.config('settings.dist') + '/css/*.css']
        }
    };
};