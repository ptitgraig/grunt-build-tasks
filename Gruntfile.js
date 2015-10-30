/*
 * grunt-pfe-tasks
 *
 * Copyright (c) 2015 BNPP PF T&S
 */

'use strict';

module.exports = function(grunt) {

    // load plugins useful for build from node_modules
    require('load-grunt-tasks')(grunt);

    // require loadash to enjoy its extend utility
    var _ = require('lodash');

    // Project configuration.
    grunt.initConfig({

        // copy templates (i.e. pfe sample sources) to the expected folder
        // the expected folder is the place where the build is being processed.
        copy: {
            template: {
                expand: true,
                cwd: 'test/template/src',
                src: '**',
                dest: 'test/expected/src'
            },
            bower: {
                expand: true,
                cwd: 'test/template/bower_components',
                src: '**',
                dest: 'test/expected/bower_components'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });


    // we use a lighter version of the settings because we do not test the "grunt serve" task
    // only the "grunt build" task is being tested
    // WARNING: the settings object must be the same as the one defined in PF-E
    var home_dir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    var settings = {
        app: 'test/expected/src',
        dist: 'test/expected/build',
        tmp: 'test/expected/.tmp',
        package: 'test/expected/package',
        bowerdir: 'test/expected/bower_components',
        module: 'pfe',
        homedir: home_dir
    };
    grunt.config('settings', settings);


    // copy:template and nodeunit tasks are erased by load-grunt-config
    // To avoid this, we store it and extend the copy task of /task
    var testCopyConf = grunt.config.data.copy;
    var testNodeUnit = {
        nodeunit: grunt.config.data.nodeunit
    };


    // load task definition from /task folder
    require('load-grunt-config')(grunt, {
        configPath: __dirname + '/tasks'
    });


    // report previously defined task into the new config object
    _.extend(grunt.config.data.copy, testCopyConf);
    _.extend(grunt.config.data, testNodeUnit);


    // load the build definition from YAML and create a task from it
    var aliases = grunt.file.readYAML('tasks/aliases.yaml', 'utf-8');
    grunt.registerTask('build', aliases.build);


    // The test consists in:
    // 1- copy:template:    copy the src and a correct build of pfe-sample into /expected
    // 2- copy:bower:       copy the bower_components folder of pfe-sample into /expected/build
    // 3- build:            run build on src in /expected
    // 4- nodeunit:         check if the build is the same as the one copied originally
    // TODO: add a clean:expected task to clean after all work
    grunt.registerTask('test',['copy:template', 'copy:bower', 'build', 'nodeunit']);

};
