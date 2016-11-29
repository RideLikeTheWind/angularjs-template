angular.module('myApp').controller('landingPageController', ['$scope', '$timeout', 'localFirebaseService', function($scope, $timeout, localFirebaseService) {
	
	$scope.salutation = "Hello there, world!";
    $scope.someOther = "There is nothing here";
	$scope.userPrefBtnTitle = "Test save";
	
    $scope.saveUserData = function() {
		$scope.userPrefBtnTitle = "Saving...";
		
    	localFirebaseService.setCurrentUserData('/userPrefs', {
    		panelsOpen: 'none',
    	}).then(function(result) {
			
    		$scope.userPrefBtnTitle = "Saved!";
			$timeout(function() { $scope.userPrefBtnTitle = "Test save"; }, 1000);
			
    	}, function(error) {
    		$scope.userPrefBtnTitle = error;
    	});
    }
	
}]);