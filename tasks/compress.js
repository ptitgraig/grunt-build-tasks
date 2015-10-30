// ## Task to compress build folder to a zip
// src:  compress build folder into a <package-name>-sources.zip (usually from raw sources)
// dist: compress build folder into a <package-name>.zip
module.exports = function(grunt){
    return {
        dist: {
            cwd:grunt.config('settings.dist'),
            expand:true,
            src:['**/*'],
            options: {
                archive: grunt.config('settings.package') + '/'+ grunt.config('settings.module') + '.zip'
            }
        },
        src: {
            cwd:grunt.config('settings.dist'),
            expand:true,
            src:['**/*'],
            options: {
                archive: grunt.config('settings.package') + '/'+ grunt.config('settings.module') + '-sources.zip'
            }
        }
    }
};