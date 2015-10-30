(function(){
    'use strict';

    angular
        .module('pfe.person')
        .factory('personService', personService);

    personService.$inject = ['$http', 'exception'];

    function personService($http, exception){

        var service = {
            findAll: findAll,
            create: create,
            deleteAll: deleteAll,
            findByLastName: findByLastName,
            triggerBusinessException: triggerBusinessException,
            triggerTechnicalException: triggerTechnicalException
        };

        return service;

        ////////////////////////
        function findAll(){

            return $http.get('rest/V1/person/findAll')
                .then(success)
                .catch(fail);

            function success(response){
                return response.data;
            }

            function fail(e){
                exception.catcher('XHR Failed for operation findAll')(e);
            }
        }

        function create(params){
            return $http.post('rest/V1/person/create', params)
                .then(success);

            function success(response){
                return response.data;
            }
        }

        function deleteAll(){
            return $http.get('rest/V1/person/deleteAll');
        }

        function findByLastName(lastname){
            return $http.get('rest/V1/person/findByLastName/' + lastname)
                .then(success);

            function success(response){
                return response.data;
            }
        }

        function triggerBusinessException(){
            return $http.get('rest/V1/person/launchBusinessException')
                .then(success);

            function success(response){
                return response.data;
            }
        }

        function triggerTechnicalException(){
            return $http.get('rest/V1/person/launchTechnicalException')
                .then(success);

            function success(response){
                return response.data;
            }
        }
    }

})();