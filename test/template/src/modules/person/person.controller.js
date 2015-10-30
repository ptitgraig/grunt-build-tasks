(function() {
    'use strict';

    angular
        .module('pfe.person')
        .controller('PersonController', PersonController);

    PersonController.$inject = ['$scope', '$state', 'persons', 'personService'];
    
    function PersonController($scope, $state, persons, personService) {
        var vm = this;

        // fetch data on page load
        // through a promise (defined in personModule)
        vm.persons = persons;

        // handle case when there is no person
        // TODO: move to person.service.js
        if (angular.isUndefined(vm.persons) || !vm.persons.length) {
            vm.error = 'No person.';
            vm.persons = [];
        }
        
        // array to store the list of found person
        vm.personsFound = [];

        // defined how many person are in the list
        // to display or not delete button
        vm.moreThanOnePerson = vm.persons.length > 0;
        
        // by default display list of person
        vm.isSearch = false;

        // delete all persons
        vm.deleteAll = function() {
            personService.deleteAll()
                .then(success);

            function success() {
                $state.reload();
            }

        };

        // add one person
        vm.createPerson = function () {
            vm.isSearch = false;

            var personParams = {
                "prenom": $scope.firstname,
                "nom": $scope.lastname,
                "dateNaissance": $scope.birthdate
            };

            personService.create(personParams)
                .then(success);

            function success(data){
                vm.persons.push(data);
            }

        };

        // search by lastname
        vm.findByLastName = function() {
            vm.isSearch = true;
            vm.personsFound = [];
            vm.error = '';

            personService.findByLastName($scope.findlastname)
                .then(success);

            function success(response){
                vm.personsFound.push(response.data);
            }

        };

        vm.triggerBusinessException = function(){
            personService.triggerBusinessException();
        };

        vm.triggerTechnicalException = function(){
            personService.triggerTechnicalException();
        };
    }

})();