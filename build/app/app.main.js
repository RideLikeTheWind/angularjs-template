angular.module('myApp', ['ngRoute', 'firebase'])

.constant('FirebaseUrl', 'https://blinding-inferno-8283.firebaseio.com/')

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