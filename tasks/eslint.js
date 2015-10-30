// ## Task to check code quality both in dev and integration environment
// Based on quality indicators defined in the .eslintrc file (in home directory)
// .eslintrc rules for integration and production
module.exports = function(grunt){
    return {
        dev: {
            options: {
                configFile: grunt.config('settings.homedir') + '/.eslintrc-dev'
            },
            src: [
                grunt.config('settings.app') + '/**/*.js'
            ]
        },
        int: {
            options: {
                configFile: grunt.config('settings.homedir') + '/.eslintrc-int'
            },
            src: [
                grunt.config('settings.app') + '/**/*.js'
            ]
        }
    }
};