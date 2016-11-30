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
<<<<<<< 5272e275853900e4520bf126d6931ae45c112178
			GAuth.login().then(function(googleUser) {
				var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
				    unsubscribe();
				    // Check if we are already signed-in Firebase with the correct user.
					console.log(firebaseUser, googleUser);
					
				    if (!$scope.isUserEqual(googleUser, firebaseUser)) {
				      // Build Firebase credential with the Google ID token.
						var credential = '';
						GAuth.getToken().then(function(result) {
							console.log(result);
	  				      credential = firebase.auth.GoogleAuthProvider.credential(result.id_token);
					      firebase.auth().signInWithCredential(credential).catch(function(error) {
					        // Handle Errors here.
					        var errorCode = error.code;
					        var errorMessage = error.message;
					        // The email of the user's account used.
					        var email = error.email;
					        // The firebase.auth.AuthCredential type that was used.
					        var credential = error.credential;
					        // ...
					      });
						});
				      
				    } else {
				      console.log('User signed into Firebase');
				    }
					
=======
			coreAuthService.login().then(function(googleUser) {
>>>>>>> Rewrote entire auth service integrating GAPI and Firebase auth
					//Stores the user locally so we can use their credentials elsewhere
					appUserManager.currentUser = googleUser;
					coreAuthService.getToken().then(function(result) {
						appUserManager.accessToken = result;
					});
<<<<<<< 5272e275853900e4520bf126d6931ae45c112178
					$scope.$broadcast('userIsLogin', true);
				
				  });
			}, function(error){
				//handle login failure
=======
			});
		}
		
		$scope.googleSignOut = function() {
			coreAuthService.logout().then(function() {
				appUserManager.currentUser = null;
				appUserManager.accessToken = null;
>>>>>>> Rewrote entire auth service integrating GAPI and Firebase auth
			});
		}
		
	}];
	
	return {
		templateUrl: '/app/auth/googleAuth.tpl.html',
		controller: googleAuthController,
		controllerAs: 'googleAuthCtrl',
	}
}]);