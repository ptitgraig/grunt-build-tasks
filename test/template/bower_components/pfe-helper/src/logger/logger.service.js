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
