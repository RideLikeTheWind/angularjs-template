angular.module('myApp').service('googleApiService', ['$q', 'appUserManager', function($q, appUserManager) {
	return {
		executeRequest: function(request) {
			var deferred = $q.defer();
			request.execute(function(resp){
				deferred.resolve(resp);
			});
			return deferred.promise;
		}
	}
}]);