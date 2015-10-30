// ## Task to minify HTML
// removeComments: Strip HTML comments
// collapseWhitespace: Collapse white space that contributes to text nodes in a document tree.
// preserveLineBreaks: Collapse to 1 line break (never remove it entirely) when whitespace between tags include a line
//                     break. Must be used in conjunction with collapseWhitespace=true
// collapseBooleanAttributes: Omit attribute values from boolean attributes
// removeCommentsFromCDATA: Strip HTML comments from scripts and styles
module.exports = function(grunt){
    return {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true
            },
            files: [{
                expand: true,
                cwd: grunt.config('settings.dist'),
                src: ['**/*.html'],
                dest: grunt.config('settings.dist')
            }]
        }
    };
};