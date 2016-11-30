angular.module('myApp').directive('navigationBar', ['googleApiService', 'appUserManager', function(googleApiService, appUserManager) {
	
	var navigationBarController = [ '$scope', function($scope) {
			
	}];
	
	var navBarLink = function(scope, elem, attrs) {
		
	};
	
	
	
	return {
		templateUrl: '/app/navigationBar/navigationBar.tpl.html',
		controller: navigationBarController,
		controllerAs: 'navBarCtrl',
		link: navBarLink,
	}
}]);