angular.module('myApp').service('appUserManager', ['Auth', function(Auth) {
	return {
		currentUser : {},
		accessToken: '',
	}
}]);