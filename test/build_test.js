'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
var fs = require('fs');

exports.testBuild= {
    setUp: function(done) {
        done();
    },
    index: function(test) {
        test.expect(1);

        var hasIndex = grunt.file.isFile('test/expected/build/index.html');
        test.ok(hasIndex, 'should check that index.html is generated.');

        test.done();
    },
    f5: function(test) {
        test.expect(2);

        var hasF5 = grunt.file.isFile('test/expected/build/F5.html');
        test.ok(hasF5, 'should check that F5.html is generated.');

        var rightF5 = grunt.file.read('test/template/build/F5.html');
        var builtF5 = grunt.file.read('test/expected/build/F5.html');
        test.equal(rightF5, builtF5, 'should have the right content');

        test.done();
    },
    modules: function(test) {
        test.expect(2);

        var hasModulePerson = grunt.file.isFile('test/expected/build/modules/person/person.html');
        test.ok(hasModulePerson, 'should check that modules/person HTML is generated.');

        var rightModulePerson = grunt.file.read('test/template/build/modules/person/person.html');
        var builtModulePerson = grunt.file.read('test/expected/build/modules/person/person.html');
        test.equal(rightModulePerson, builtModulePerson, 'should have the right content');

        test.done();
    },
    js: function(test) {
        test.expect(4);

        var jsDir = fs.readdirSync('test/expected/build/js');
        var dirLen = jsDir.length;

        // check is js files are revised
        // basically we know there are only 2 files :-)
        for(var i = 0; i < dirLen; i++) {
            var jsFile = jsDir[i];
            var jsSplit = jsFile.split('.');
            var isRevised = jsSplit.length === 3;
            test.ok(isRevised, 'should check that '+ jsFile +' JS file is revised.');
        }

        // remove revision from js files so that we can compare them
        for(var i = 0; i < dirLen; i++) {
            var jsFile = jsDir[i];
            var jsSplit = jsFile.split('.');
            jsSplit.splice(1,1);
            var jsUnrev = jsSplit.join('.');
            fs.renameSync('test/expected/build/js/' + jsFile, 'test/expected/build/js/' + jsUnrev);
        }

        // check content of app.js and cdn.js
        var rightAppJS = grunt.file.read('test/template/build/js/app.js');
        var builtAppJS = grunt.file.read('test/expected/build/js/app.js');
        test.equal(rightAppJS, builtAppJS, 'should have the right content');

        var rightCdnJS = grunt.file.read('test/template/build/js/cdn.js');
        var builtCdnJS = grunt.file.read('test/expected/build/js/cdn.js');
        test.equal(rightCdnJS, builtCdnJS, 'should have the right content');

        test.done();
    },
    css: function(test) {
        test.expect(4);

        var cssDir = fs.readdirSync('test/expected/build/css');
        var dirLen = cssDir.length;

        // check is css files are revised
        // basically we know there are only 2 files :-)
        for(var i = 0; i < dirLen; i++) {
            var cssFile = cssDir[i];
            var cssSplit = cssFile.split('.');
            var isRevised = cssSplit.length === 3;
            test.ok(isRevised, 'should check that '+ cssFile +' CSS file is revised.');
        }

        // remove revision from css files so that we can compare them
        for(var i = 0; i < dirLen; i++) {
            var cssFile = cssDir[i];
            var cssSplit = cssFile.split('.');
            cssSplit.splice(1,1);
            var cssUnrev = cssSplit.join('.');
            fs.renameSync('test/expected/build/css/' + cssFile, 'test/expected/build/css/' + cssUnrev);
        }

        // check content of app.css and cdn.css
        var rightAppCSS = grunt.file.read('test/template/build/css/app.css');
        var builtAppCSS = grunt.file.read('test/expected/build/css/app.css');
        test.equal(rightAppCSS, builtAppCSS, 'should have the right content');

        var rightCdnCSS = grunt.file.read('test/template/build/css/cdn.css');
        var builtCdnCSS = grunt.file.read('test/expected/build/css/cdn.css');
        test.equal(rightCdnCSS, builtCdnCSS, 'should have the right content');

        test.done();
    },
    assets: function(test) {
        test.expect(1);

        var assetsDir = fs.readdirSync('test/expected/build/assets/img');
        var dirLen = assetsDir.length;

        // check is css files are revised
        for(var i = 0; i < dirLen; i++) {
            var assetFile = assetsDir[i];
            var assetSplit = assetFile.split('.');
            var isRevised = assetSplit.length === 3;
            test.ok(isRevised, 'should check that '+ assetFile +' img file is revised.');
        }

        test.done();
    }
};
