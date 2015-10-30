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


