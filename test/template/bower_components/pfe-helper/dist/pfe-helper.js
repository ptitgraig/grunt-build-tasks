/**
 * Helper functionalities for PF-E
 * @version v1.0.0-dev-2015-10-21
 * @link http://personalfinance-technology-pf.sfdi.echonet/Support-teo/HTML5-JS/Default.htm
 * @license BNPP-PF Techonology & Support */

(function (window, angular, undefined) {

/**
 * @ngdoc overview
 * @name pfe.helper.router
 *
 * @requires ui.router
 * @requires pfe.helper.logger
 *
 * @description
 * # pfe.helper.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link pfe.helper} module instead).
 *
 */
angular.module('pfe.helper.router', ['ui.router', 'pfe.helper.logger']);

/**
 * @ngdoc overview
 * @name pfe.helper.exception
 *
 * @requires pfe.helper.logger
 *
 * @description
 * # pfe.helper.exception sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link pfe.helper} module instead).
 */
angular.module('pfe.helper.exception', ['pfe.helper.logger']);

/**
 * @ngdoc overview
 * @name pfe.helper.logger
 *
 *
 * @description
 * # pfe.helper.logger sub-module
 *
 * This module is a dependency of the main pfe.helper module. Do not include this module as a dependency
 * in your angular app (use {@link pfe.helper} module instead).
 *
 */
angular.module('pfe.helper.logger', []);

/**
 * @ngdoc overview
 * @name pfe.helper
 *
 * @requires pfe.helper.logger
 * @requires pfe.helper.exception
 * @requires pfe.helper.router
 *
 * @description
 * # pfe.helper
 *
 * ## The main module for pfe.helper
 * There are several sub-modules included with the pfe.helper module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes.
 *
 * The modules are:
 * * pfe.helper - the main "umbrella" module
 * * pfe.helper.logger - the module in charge of logging
 * * pfe.helper.exception - the module in charge of exception
 * * pfe.helper.router - the module in charge of facilitating routes
 *
 * *You'll need to include **only** this module as the dependency within your angular app.*
 *
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script src="js/pfe.helper"></script>
 *   <script>
 *     // ...and add 'pfe.helper' as a dependency
 *     var myApp = angular.module('myApp', ['pfe.helper']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module('pfe.helper', ['pfe.helper.logger', 'pfe.helper.exception', 'pfe.helper.router']);
/**
 * @ngdoc object
 * @name pfe.helper.logger
 *
 * @requires $log
 * @requires toastr
 *
 * @description
 * Display to the user a log message through toastr
 */

logger.$inject = ['$log', 'toastr'];

function logger($log, toastr) {
    var service = {

        // TODO: make it configurable
        showToasts: false,

        error   : error,
        info    : info,
        success : success,
        warning : warning,

        // straight to console; bypass toastr
        log     : $log.log
    };

    return service;
    /////////////////////

    function error(message, data, title) {
        toastr.error(message, title);
        $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
        toastr.info(message, title);
        $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
        toastr.success(message, title);
        $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
        toastr.warning(message, title);
        $log.warn('Warning: ' + message, data);
    }
}

angular.module('pfe.helper.logger').factory('logger', logger);

/**
 * @ngdoc object
 * @name pfe.helper.exception
 *
 * @requires $q
 * @requires logger
 *
 * @description
 * Service that does same as logger service apart that it adds the possibility
 * to add more specific information about the exception and pass the error to the next handler
 *
 * @example exception.catcher('My specific error message')(e);
 */

exception.$inject = ['$q', 'logger'];
function exception($q, logger) {
    var service = {
        catcher: catcher
    };

    return service;

    /**
     * Logs the error message and resolve the promise with a rejection
     * @param  {String} message
     * @example exception.catcher('My specific error message')(e);
     * @return {Function} $q
     */
    function catcher(message) {

        return function(e) {
            var thrownDescription;
            var newMessage = message;

            if(e.data && e.data.description) {
                thrownDescription = '\n' + e.data.description;
                newMessage = message + thrownDescription;
            }

            logger.error(newMessage);

            return $q.reject(e);
        };
    }
}

angular.module('pfe.helper.exception').factory('exception', exception);
/**
 * @ngdoc object
 * @name pfe.helper.exception
 * @description
 * Service extending the default Angular service: `$exceptionHandler`
 * Any uncaught exception in angular expressions is delegated to this service
 * This handler adds the following:
 * * the error prefix define in the configuration
 * * display a toast with the error message
* */


/**
 * Must configure the exception handling
 * @return {[type]}
 */
function exceptionHandlerProvider() {
    /* jshint validthis:true */
    this.config = {
        appErrorPrefix: null,
        appTitle: null
    };

    this.configure = function (appMetaData) {
        this.config.appErrorPrefix = appMetaData.appErrorPrefix;
        this.config.appTitle = appMetaData.appTitle;
    };

    this.$get = function() {
        return {config: this.config};
    };
}

/**
 * Configure by setting an optional string value for appErrorPrefix.
 * Accessible via config.appErrorPrefix (via config value).
 * @param  {[type]} $provide
 * @return {[type]}
 */
config.$inject = ['$provide'];
function config($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

/**
 * @ngdoc function
 * @name pfe.helper.exception.extendExceptionHandler
 * Extend the $exceptionHandler service to also display a toast
 * and record the error through logging it on a backend endpoint
 * @param  {Object} $delegate
 * @param  {Object} exceptionHandler
 * @param  {Object} logger
 * @param  {Object} $window
 * @example throw { message: 'error message we added' };
 *          throw exception;
 * @return {Function} the decorated $exceptionHandler service
 *
 * handle ReferenceError
 *
 */
extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger', '$window'];
function extendExceptionHandler($delegate, exceptionHandler, logger, $window) {
    return function(exception, cause) {

        var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
        var appTitle = exceptionHandler.config.appTitle || '';
        var errorData = {exception: exception, cause: cause};
        exception.message = appErrorPrefix + exception.message;

        // warn the user about the error with a toast
        logger.error(exception.message, errorData);

        // use our traceService to generate a stack trace to log
        // on a backend endpoint
        try{

            var serverLoggedError = {
                app: appTitle,
                location: $window.location.href,
                message: exception.message,
                cause: cause || ''
            };

            // use AJAX (in this example jQuery) and NOT $http
            // to avoid circular dependency
            $.ajax({
                type: "POST",
                url: "rest/V1/person/js/traceError",
                contentType: "application/json",
                data: angular.toJson(serverLoggedError)
            })
            .done(function success() {
                logger.log('Error has been recorded to our server.');
            })
            .fail(function fail(jqXHR) {
                var errorMsg = jqXHR.responseText + jqXHR.status + ' ' + jqXHR.statusText;
                logger.log('Error server-side logging failed\n' + errorMsg);
            });

        } catch (loggingError){
            logger.warning('Error server-side logging failed\n'+loggingError);
        }

        // keep default behavior
        $delegate(exception, cause);

    };
}

angular.module('pfe.helper.exception').provider('exceptionHandler', exceptionHandlerProvider).config(config);
/**
 * @ngdoc object
 * @name pfe.helper.router.routerHelper
 *
 * @requires $stateProvider
 * @requires $locationProvider
 * @requires $urlRouterProvider
 *
 * @description
 * `routerHelper` augments default ui.router behavior with
 * * possibility to update doc title when state changes
 * * possibility to configure multiples states at one place
 * * handling of route errors with a log (toastr) message and a redirection to `/`
 *
 */

routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

    // TODO: make it configurable
    var config = {
        docTitle: null,
        resolveAlways: {}
    };

    // commented due to incompatibility with IE9
    //$locationProvider.html5Mode(true);

    this.configure = function(cfg) {
        angular.extend(config, cfg);
    };

    this.$get = RouterHelper;

    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];

    function RouterHelper($location, $rootScope, $state, logger) {
        var handlingStateChangeError = false;
        var hasOtherwise = false;
        var stateCounts = {
            errors: 0,
            changes: 0
        };

        var service = {
            configureStates: configureStates,
            getStates: getStates,
            stateCounts: stateCounts
        };

        init();

        return service;

        ///////////////

        function configureStates(states, otherwisePath) {
            states.forEach(function(state) {
                state.config.resolve =
                    angular.extend(state.config.resolve || {}, config.resolveAlways);
                $stateProvider.state(state.state, state.config);
            });
            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                $urlRouterProvider.otherwise(otherwisePath);
            }
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the index.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    var destination = toState &&
                        (toState.title || toState.name || toState.loadedTemplateUrl) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' +
                        (error.data || '') + '. <br/>' + (error.statusText || '') +
                        ': ' + (error.status || '');
                    logger.warning(msg, [toState]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getStates() { return $state.get(); }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState) {
                    stateCounts.changes++;
                    handlingStateChangeError = false;
                    var title = config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
}

angular.module('pfe.helper.router').provider('routerHelper', routerHelperProvider);


})(window, window.angular);