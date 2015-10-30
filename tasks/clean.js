// ## Task to clean files and folder
// clean:dist will delete `.tmp` folder and remove all files in `build` folder
// clean:package will clean build and package folders
module.exports = function(grunt){
    return {
        tmp: grunt.config('settings.tmp'),
        dist: {
            files: [{
                dot: true,
                src: [grunt.config('settings.tmp'), grunt.config('settings.dist')]
            }]
        },
        package: {
            files: [{
                dot: true,
                src: [grunt.config('settings.dist'), grunt.config('settings.package')]
            }]
        }
    };
};