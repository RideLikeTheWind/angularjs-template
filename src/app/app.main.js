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

<<<<<<< HEAD
<<<<<<< 5272e275853900e4520bf126d6931ae45c112178
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
=======
=======
>>>>>>> 8057191fe288fd8cfc037e565ae6b48d5fbca085
.run(['coreAuthService', '$q', function(coreAuthService, $q) {
	coreAuthService.setDiscoveryDocuments({drive:'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest', classroom: 'https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'});
	coreAuthService.setClientId('901439137249-3aulv1h92rntb6c4lav87e4q1uo63kq7.apps.googleusercontent.com')
	coreAuthService.setApiKey('AIzaSyDB63Vn4PYhZn9XoHLzSUFADsmws1oDZaw');
	coreAuthService.setScopes('https://www.googleapis.com/auth/calendar.readonly');
	coreAuthService.initiateGapi().then(function() {
		gapi.client.load('calendar', 'v3');
		gapi.client.load('classroom', 'v1');
	});
	
<<<<<<< HEAD
}]);
>>>>>>> Rewrote entire auth service integrating GAPI and Firebase auth
=======
}]);
>>>>>>> 8057191fe288fd8cfc037e565ae6b48d5fbca085
