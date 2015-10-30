(function() {
    'use strict';

    angular
        .module('pfe.person')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {

        personPromise.$inject = ['personService'];

        function personPromise(personService){
            return personService.findAll().then(function(data){
                return data;
            });
        }

        return [
            {
                state: 'person',
                config: {
                    resolve: {
                        persons: personPromise
                    },
                    url: '/person',
                    templateUrl: 'modules/person/person.html',
                    controller: 'PersonController',
                    controllerAs: 'vm',
                    title: 'person route'
                }
            }
        ];
    }
})();
