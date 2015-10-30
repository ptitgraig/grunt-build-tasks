(function () {
    'use strict';

    var core = angular.module('pfe.core');

    // configuration of the toastr
    // TODO: move this to base module
    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.closeButton = true;
        toastr.options.timeOut = 0;
        toastr.options.showDuration = 0;
        toastr.options.positionClass = 'toast-top-right';
    }

    // configuration of prefix error and application title
    // TODO: extract it to a config file
    var config = {
        appErrorPrefix: '[PFE Error] ',
        appTitle: 'Sample app'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$httpProvider'];

    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, $httpProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config);

        $httpProvider.interceptors.push('errorInterceptor');

        // Force request to show right headers
        // X-Requested-With: mainly used to identify Ajax requests
        // Accept: Content-Types that are acceptable for the response
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post.Accept = 'application/json';
    }

    core.factory('errorInterceptor', errorInterceptor);

    errorInterceptor.$inject = ['$q'];

    function errorInterceptor($q){
        return {
            request: function (config) {
                return config || $q.when(config);
            },
            requestError: function (request) {
                // TODO: check here when server is down to add some message to user
                return $q.reject(request);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                var errMsg = '';

                // create a human readable error message
                if (angular.isDefined(response.status)) {
                    errMsg = errMsg + response.status;
                }
                if (angular.isDefined(response.statusText)) {
                    errMsg = errMsg + ' (' + response.statusText + ')';
                }
                if (angular.isDefined(response.data)) {
                    errMsg = errMsg + ' ' + response.data;
                }

                // call exception handler
                throw {
                    message: errMsg
                };
            }
        };
    }

})();
