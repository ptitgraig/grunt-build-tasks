# grunt-pfe-tasks

> Grunt plugin to manage tasks at dependency level

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
npm install grunt-pfe-tasks --save-dev
```

## Overview

`grunt-pfe-tasks` is not as such a grunt task. It simply gives you access to the set of PF-E build tasks:

 * grunt serve: start a node.js server to serve application along with livereload functionality
 * grunt build: build the application for production
 * grunt serve-dist: serve the built application. Useful to test if the build is correct.
 * grunt package: create a package (.zip) from the built sources for maven overlay
 * grunt package-src: create a package (.zip) from the raw sources
 * grunt bundle-src: bundle the raw source in a single folder (for production debugging)
 * grunt serve-bundle-src: serve the bundled raw source. Useful to test if the bundling is correct

## Usage

### In your PF-E project

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-pfe-tasks');
```

Or you can get it with the help of `load-grunt-task` plugin.

In your grunt file. Make a references to these tasks as:

```
var pathToTasks = path.join(process.cwd(), 'node_modules', 'grunt-pfe-tasks');
require('load-grunt-config')(grunt, {
    configPath: path.join(pathToTasks, 'tasks')
});
```

## Tests


### Test your build

First you need to install npm packages. 

```
npm install
```

Another useful feature of grunt-pfe-task is that it enable you to check your build.
A series of test have been implemented to check if the build is right.
To run the test: `grunt test`. 
This command will first run your build and then compare the producted build with a reference one. 


### If you make breaking changes in the build process 
 
If you make breaking changes in the build process, you might have to change the tests.
The PF-E sample app is used as a reference to test the build.
The way testing work is by comparing a built with a template (a correct version of the build). The steps are:

 * first ensure the build you produce is correct and nothing is missing. You can use the `grunt serve-dist` task
 to help you achieving this.
 * copy a version your sources into `test/template/src`
 * copy the produced (and correct!!) build into the `test/template/build`. This folder will be used as a reference
 to check if the build is correctly running
 * copy a version of `bower_components` if changes have been made to core dependencies
 * update the tests accordingly
 

## Changelog

* 1.0.0: First release. Inclusion of test.
