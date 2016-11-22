angular.module("myApp").directive('googleAuthentication', ['firebase', 'Auth', function(firebase, Auth) {
	
	var googleAuthController = ['$scope', function($scope) {
		
		
		$scope.googleSignIn = function() {
			Auth.$signInWithPopup("google").then(function(result) {
				
			  console.log("Signed in as:", result.user.uid);
			  
			}).catch(function(error) {
				
			  console.error("Authentication failed:", error);
			  
			});
		}
		
		
	}];
	
	return {
		templateUrl: '/app/auth/googleAuth.tpl.html',
		controller: googleAuthController,
		controllerAs: 'googleAuthCtrl',
	}
}]);