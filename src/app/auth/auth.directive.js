angular.module("myApp").directive('googleAuthentication', ['firebase', 'firebaseAuth', '$scope', function() {
	
	var googleAuthCtrl = ['$scope', function($scope) {
		$scope.authObj.$signInWithPopup("google").then(function(result) {
		  console.log("Signed in as:", result.user.uid);
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	}];
	
	return {
		templateUrl: '/app/auth/googleAuth.tpl.html',
		controller: googleAuthCtrl,
		controllerAs: 'googleAuthCtrl',
	}
}]);