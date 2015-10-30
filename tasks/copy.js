// ## Task to copy files and folder
// copy:dist will copy:
//      - icons, images, html, fonts files from `src` folder to `build` folder
//      - bootstrap fonts files from `bower_components` folder to `build` folder
// copy:styles will copy all css files from `src` folder to `.tmp` folder
// copy:js will copy all js files from `src` folder to `.tmp` folder
// copy:bower_components will copy all js files from `bower_components` folder to `build` folder
// TODO: bower_components - copy only main file (see bower.json "main" property)
module.exports = function(grunt){
    return {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: grunt.config('settings.app'),
                dest: grunt.config('settings.dist'),
                src: ['**/*.{ico,png,txt,gif,jpg,jpeg}', '**/*.html', 'fonts/*', '!index.html']
            }, {
                expand: true,
                cwd: grunt.config('settings.bowerdir') + '/bootstrap/dist',
                src: 'fonts/*',
                dest: grunt.config('settings.dist')
            }]
        },
        styles: {
            expand: true,
            cwd: grunt.config('settings.app'),
            dest: grunt.config('settings.tmp'),
            src: '**/*.css'
        },
        js: {
            expand: true,
            cwd: grunt.config('settings.app'),
            dest: grunt.config('settings.tmp')+ '/',
            src: ['**/*.js']
        },
        bower_components: {
            expand: true,
            cwd: grunt.config('settings.bowerdir'),
            dest: grunt.config('settings.dist') + '/' + grunt.config('settings.bowerdir'),
            src: ['**/*']
        },
        all_src: {
            expand: true,
            cwd: grunt.config('settings.app'),
            dest: grunt.config('settings.dist'),
            src: ['**/*']
        },
        index: {
            expand: true,
            cwd: grunt.config('settings.app'),
            dest: grunt.config('settings.dist'),
            src: ['index.html']
        }
    };
};