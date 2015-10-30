(function() {
    'use strict';

    angular
        .module('pfe.core')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        var otherwise = '/person';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '400',
                config: {
                    url: '/400',
                    templateUrl: 'modules/core/400.html',
                    title: '400 Bad request'
                }
            },{
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'modules/core/404.html',
                    title: '404 Page not found'
                }
            },{
                state: '500',
                config: {
                    url: '/500',
                    templateUrl: 'modules/core/500.html',
                    title: '500 Internal server error'
                }
            }
        ];
    }
})();
