angular.module('myApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
 
  $routeProvider
    .when('/', {
      controller:'landingPageController as landingPage',
      templateUrl:'app/landingPage/landingPage.tpl.html'
    })
    .otherwise({
      redirectTo:'/'
    });
}]);