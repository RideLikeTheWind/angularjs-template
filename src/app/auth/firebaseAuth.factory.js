angular.module('myApp')
  .factory('Auth', ['$firebaseAuth', 'FirebaseUrl', function($firebaseAuth, FirebaseUrl){
	      var auth = $firebaseAuth();

	      return auth;
  }]);