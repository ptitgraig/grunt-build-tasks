'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var files = require('./files').files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        builddir: 'dist',
        buildtag: '-dev-' + grunt.template.today('yyyy-mm-dd'),
        meta: {

            banner: '/**\n' +
            ' * <%= pkg.description %>\n' +
            ' * @version v<%= pkg.version %><%= buildtag %>\n' +
            ' * @link <%= pkg.homepage %>\n' +
            ' * @license BNPP-PF Techonology & Support' +
            ' */'
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>\n\n'+
                '(function (window, angular, undefined) {\n',
                footer: '})(window, window.angular);'
            },
            build: {
                src: files.src,
                dest: '<%= builddir %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            build: {
                files: {
                    '<%= builddir %>/<%= pkg.name %>.min.js': ['<banner:meta.banner>', '<%= concat.build.dest %>']
                }
            }
        }
    });

    grunt.registerTask('build', 'Perform a normal build', ['concat', 'uglify']);

};
