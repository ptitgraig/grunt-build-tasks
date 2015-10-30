!function(){"use strict";angular.module("pfe",["pfe.core","pfe.person"])}(),function(){"use strict";angular.module("pfe.core",["pfe.helper","ui.bootstrap","ui.router"])}(),function(){"use strict";angular.module("pfe.person",["pfe.core"])}(),function(){"use strict";function a(a){a.options.closeButton=!0,a.options.timeOut=0,a.options.showDuration=0,a.options.positionClass="toast-top-right"}function b(a,b,c,d){a.debugEnabled&&a.debugEnabled(!0),c.configure(e),d.interceptors.push("errorInterceptor"),d.defaults.headers.post["X-Requested-With"]="XMLHttpRequest",d.defaults.headers.post.Accept="application/json"}function c(a){return{request:function(b){return b||a.when(b)},requestError:function(b){return a.reject(b)},response:function(b){return b||a.when(b)},responseError:function(a){var b="";throw angular.isDefined(a.status)&&(b+=a.status),angular.isDefined(a.statusText)&&(b=b+" ("+a.statusText+")"),angular.isDefined(a.data)&&(b=b+" "+a.data),{message:b}}}}var d=angular.module("pfe.core");d.config(a),a.$inject=["toastr"];var e={appErrorPrefix:"[PFE Error] ",appTitle:"Sample app"};d.value("config",e),d.config(b),b.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider","$httpProvider"],d.factory("errorInterceptor",c),c.$inject=["$q"]}(),function(){"use strict";angular.module("pfe.core").constant("toastr",toastr)}(),function(){"use strict";function a(a){var c="/person";a.configureStates(b(),c)}function b(){return[{state:"400",config:{url:"/400",templateUrl:"modules/core/400.html",title:"400 Bad request"}},{state:"404",config:{url:"/404",templateUrl:"modules/core/404.html",title:"404 Page not found"}},{state:"500",config:{url:"/500",templateUrl:"modules/core/500.html",title:"500 Internal server error"}}]}angular.module("pfe.core").run(a),a.$inject=["routerHelper"]}(),function(){"use strict";function a(a,b,c,d){var e=this;e.persons=c,(angular.isUndefined(e.persons)||!e.persons.length)&&(e.error="No person.",e.persons=[]),e.personsFound=[],e.moreThanOnePerson=e.persons.length>0,e.isSearch=!1,e.deleteAll=function(){function a(){b.reload()}d.deleteAll().then(a)},e.createPerson=function(){function b(a){e.persons.push(a)}e.isSearch=!1;var c={prenom:a.firstname,nom:a.lastname,dateNaissance:a.birthdate};d.create(c).then(b)},e.findByLastName=function(){function b(a){e.personsFound.push(a.data)}e.isSearch=!0,e.personsFound=[],e.error="",d.findByLastName(a.findlastname).then(b)},e.triggerBusinessException=function(){d.triggerBusinessException()},e.triggerTechnicalException=function(){d.triggerTechnicalException()}}angular.module("pfe.person").controller("PersonController",a),a.$inject=["$scope","$state","persons","personService"]}(),function(){"use strict";function a(a){a.configureStates(b())}function b(){function a(a){return a.findAll().then(function(a){return a})}return a.$inject=["personService"],[{state:"person",config:{resolve:{persons:a},url:"/person",templateUrl:"modules/person/person.html",controller:"PersonController",controllerAs:"vm",title:"person route"}}]}angular.module("pfe.person").run(a),a.$inject=["routerHelper"]}(),function(){"use strict";function a(a,b){function c(){function c(a){return a.data}function d(a){b.catcher("XHR Failed for operation findAll")(a)}return a.get("rest/V1/person/findAll").then(c)["catch"](d)}function d(b){function c(a){return a.data}return a.post("rest/V1/person/create",b).then(c)}function e(){return a.get("rest/V1/person/deleteAll")}function f(b){function c(a){return a.data}return a.get("rest/V1/person/findByLastName/"+b).then(c)}function g(){function b(a){return a.data}return a.get("rest/V1/person/launchBusinessException").then(b)}function h(){function b(a){return a.data}return a.get("rest/V1/person/launchTechnicalException").then(b)}var i={findAll:c,create:d,deleteAll:e,findByLastName:f,triggerBusinessException:g,triggerTechnicalException:h};return i}angular.module("pfe.person").factory("personService",a),a.$inject=["$http","exception"]}();