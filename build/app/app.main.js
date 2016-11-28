angular.module('myApp', ['ngRoute', 'firebase', 'angular-google-gapi'])

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
}])

.run(['GAuth', 'GApi', 'GData', '$rootScope', 'appUserManager',
    function(GAuth, GApi, GData, $rootScope, appUserManager) {

        $rootScope.gdata = GData;

        var CLIENT = '901439137249-3aulv1h92rntb6c4lav87e4q1uo63kq7.apps.googleusercontent.com';
        var BASE = 'https://localhost:8000/_ah/api';

        GApi.load('gmail','v1');
        GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/)

        GAuth.setClient(CLIENT)
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly');

        // load the auth api so that it doesn't have to be loaded asynchronously
        // when the user clicks the 'login' button.
        // That would lead to popup blockers blocking the auth window
        GAuth.load().then(function() {
        	console.log('loaded');
        });
		
    }
]);