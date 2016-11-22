angular.module('myApp').directive('searchPanel', ['$timeout', function($timeout) {
	
	var searchPanelController = ['$scope', function($scope) {
		
		//Shows that the controller loads first, before the template is copied
		console.log("controller");
		
		//Put a loading message up - can be a spinner etc.
		$scope.loadingPlaceholder = "Hey, still loading!";
	}];
	
	return {
		templateUrl: '/app/searchPanel/search_panel.tpl.html',
		controller: searchPanelController,
		controllerAs: 'searchPanelCtrl',
		replace: true,
		scope: false,
		link: function(scope, elem, attrs) {
			
			//Shows that the link function loads second
			console.log("link");
			
			//Demonstrates an async API call that takes time to load. 
			$timeout(function() {
				scope.loadingPlaceholder = "Loaded";
			}, 1000);
			
		}
	}
}]);