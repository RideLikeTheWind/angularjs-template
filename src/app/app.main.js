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
}])

.run(['coreAuthService', '$q', function(coreAuthService, $q) {
	coreAuthService.setDiscoveryDocuments({drive:'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest', classroom: 'https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'});
	coreAuthService.setClientId('901439137249-3aulv1h92rntb6c4lav87e4q1uo63kq7.apps.googleusercontent.com')
	coreAuthService.setApiKey('AIzaSyDB63Vn4PYhZn9XoHLzSUFADsmws1oDZaw');
	coreAuthService.setScopes('https://www.googleapis.com/auth/calendar.readonly');
	coreAuthService.initiateGapi().then(function() {
		gapi.client.load('calendar', 'v3');
		gapi.client.load('classroom', 'v1');
	});
	
}]);