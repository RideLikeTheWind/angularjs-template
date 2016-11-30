angular.module("myApp").directive('googleAuthentication', ['firebase', 'Auth', 'appUserManager', '$window', 'coreAuthService', function(firebase, Auth, appUserManager, $window, coreAuthService) {
	
	var googleAuthController = ['$scope', function($scope) {
		
		$scope.auth = Auth;
		$scope.$on('gapiAuthService:signedIn', function(event, args) {
			$scope.signInButton = args.userSignedIn;
			if(args.userSignedIn){
				console.log('Firebase user: ',firebase.auth().currentUser);
			}
		});

		$scope.googleSignIn = function() {
		// Fires the login and connects with the FB database if necessary
			coreAuthService.login().then(function(googleUser) {
					//Stores the user locally so we can use their credentials elsewhere
					appUserManager.currentUser = googleUser;
					coreAuthService.getToken().then(function(result) {
						appUserManager.accessToken = result;
					});
			});
		}
		
		$scope.googleSignOut = function() {
			coreAuthService.logout().then(function() {
				appUserManager.currentUser = null;
				appUserManager.accessToken = null;
			});
		}
		
	}];
	
	return {
		templateUrl: '/app/auth/googleAuth.tpl.html',
		controller: googleAuthController,
		controllerAs: 'googleAuthCtrl',
	}
}]);