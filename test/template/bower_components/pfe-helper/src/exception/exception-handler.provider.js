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