angular.module('myApp').service('localFirebaseService', ['Auth', '$firebaseObject', '$q', function(Auth, $firebaseObject, $q) {
	return {
		setCurrentUserData: function(path, data){
			
			var defer = $q.defer();
			
			var firebaseUser = Auth.$getAuth();
			
			var uid = firebaseUser.uid;
			
			var obj = $firebaseObject(firebase.database().ref('users/'+uid+path));
			//iterate over data object and add to our object or use underscore
			obj.foo = "bar";
			obj.$save().then(function(ref) {
			  ref.key === obj.$id; // true
			  return defer.resolve(ref);
			}, function(error) {
			  console.log("Error:", error);
			  return defer.reject;
			});
			return defer.promise;
		}
	}
}]);