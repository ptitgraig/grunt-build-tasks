
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