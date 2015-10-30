// ## Task to Start a connect web server
module.exports = function(grunt){
    return {
        options: {
            port: grunt.config('settings.port'),
            hostname: grunt.config('settings.hostname'),
            //keepalive: true
            livereload: grunt.config('settings.lrPort')
        },
        proxies: [{
            context: '/rest/V1',
            host: grunt.config('settings.proxyHost'),
            port: grunt.config('settings.proxyPort'),
            https: false,
            changeOrigin: false,
            rewrite: {
                '^/rest/V1': grunt.config('settings.proxyCtx') + '/rest/V1'
            }
        }],
        livereload: {
            options: {
                open: true,
                middleware: function(connect, grunt) {
                    return [
                        require('grunt-connect-proxy/lib/utils').proxyRequest,
                        connect().use('/bower_components', connect.static('./bower_components')),
                        connect.static('src')
                    ];
                }
            }
        },
        dist: {
            options: {
                open: true,
                base: grunt.config('settings.dist'),
                livereload: false
            }
        }
    };
};