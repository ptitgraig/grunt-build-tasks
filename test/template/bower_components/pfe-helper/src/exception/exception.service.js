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