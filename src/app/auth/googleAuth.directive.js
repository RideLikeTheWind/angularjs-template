angular.module("myApp").directive('googleAuthentication', ['firebase', 'Auth', 'appUserManager', 'GAuth', '$window', function(firebase, Auth, appUserManager, GAuth, $window) {
	
	var googleAuthController = ['$scope', function($scope) {
		
		$scope.auth = Auth;
		
		$scope.isUserEqual = function (googleUser, firebaseUser) {
		  if (firebaseUser) {
		    var providerData = firebaseUser.providerData;
		    for (var i = 0; i < providerData.length; i++) {
		      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
		          providerData[i].uid === googleUser.id) {
		        // We don't need to reauth the Firebase connection.
		        return true;
		      }
		    }
		  }
		  return false;
		}
		
		$scope.googleSignIn = function() {
			
		// Fires the login and connects with the FB database if necessary
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
					
					//Stores the user locally so we can use their credentials elsewhere
					appUserManager.currentUser = googleUser;
					GAuth.getToken().then(function(result) {
						appUserManager.accessToken = result;
					});
					$scope.$broadcast('userIsLogin', true);
				
				  });
			}, function(error){
				//handle login failure
			});
		}
		
	}];
	
	return {
		templateUrl: '/app/auth/googleAuth.tpl.html',
		controller: googleAuthController,
		controllerAs: 'googleAuthCtrl',
	}
}]);