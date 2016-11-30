(function() {
		angular.module('myApp').service('coreAuthService', ['$window', '$q', '$rootScope', function($window, $q, $rootScope) {
	
		function loadGapi() {
	        var deferred = $q.defer();
	        $window.handleClientLoad = function(){
	            deferred.resolve();
	        }
			return deferred.promise;
		}
	
		return {
			documentApis: [],
			discoveryDocuments: {},
			apiKey: '',
			clientId: '',
			scopes: 'profile email', //minimum scope
			
			setDiscoveryDocuments: function(urlObject) {
				this.discoveryDocuments = urlObject;
				return true;
			},
			setApiKey: function(apiKey) {
				this.apiKey = apiKey;
				return true;
			},
			setClientId: function(clientId) {
				this.clientId = clientId;
				return true;
			},
			setScopes: function(scopes){
				this.scopes = this.scopes + ' ' + scopes;
				return true;
			},
			
			
			//Gapi loaders
			observeGapiLoad: function() {
				var deferred = $q.defer();
				loadGapi().then(function() {
					return deferred.resolve(true);
				});
				return deferred.promise;
			},
			loadGapiApis: function() {
				
				var promises = [];
				
				var loadDiscoveryDocument = function(documentUrl) {
					var deferred = $q.defer();
					var data = '';
					var fetchDiscoveryDocument = fetch(documentUrl).then(
					            function(resp){
					          	  	return resp.json();
					       	 	}).then(function(json) {
					          		data = json;
									return deferred.resolve(data);
								});
							return deferred.promise;
						}
				
				if(this.discoveryDocuments){
					angular.forEach(this.discoveryDocuments, function(value, key){
						console.log('Loading '+key,value);
						promises.push(loadDiscoveryDocument(value));
					});
				}
				
				var q = $q.defer();
				
				$q.all(promises).then(function() {
					return q.resolve(promises);
				});
				return q.promise;
			},
			initGapiClient: function() {
				var deferred = $q.defer();
				var authSrv = this;
				gapi.client.init({
				            apiKey: this.apiKey,
				            discoveryDocs: this.documentApis,
				            clientId: this.clientId,
				            scope: this.scopes
				        }).then(function() {
				        	console.log('Gapi init', gapi);
						
							gapi.auth2.getAuthInstance().isSignedIn.listen(authSrv.updateSigninStatus());
							authSrv.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
							return deferred.resolve();
				        });
				return deferred.promise;
			},
			updateSigninStatus: function(isSignedIn) {
				if (isSignedIn) {
					$rootScope.$broadcast('gapiAuthService:signedIn', {userSignedIn:true});
				} else {
					$rootScope.$broadcast('gapiAuthService:signedIn', {userSignedIn:false});
				}
			},
			initiateGapi: function() {
				var deferred = $q.defer();
				var authSrv = this;
				
				authSrv.observeGapiLoad().then(function() {
					gapi.load('client:auth2');
					authSrv.loadGapiApis().then(function(promises) {
						console.log(promises);
						authSrv.initGapiClient().then(function() {
							return deferred.resolve();
						});
					});
				});
				return deferred.promise;
			},
			
			login: function() {
				var authSrv = this;
				var deferred = $q.defer();
				gapi.auth2.getAuthInstance().signIn().then(function() {
					authSrv.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
					$q.all([gapi.auth2.getAuthInstance().currentUser.get(), authSrv.connectFirebaseUsers()]);
				});
				return deferred.promise;
			},
			logout: function() {
				var authSrv = this;
				var deferred = $q.defer();
				deferred.resolve(gapi.auth2.getAuthInstance().signOut());
				gapi.auth2.getAuthInstance().signOut().then(function() {
					authSrv.updateSigninStatus(false);
					deferred.resolve();
				});
				return deferred.promise;
			},
			getToken: function() {
				var deferred = $q.defer();
				deferred.resolve(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
				return deferred.promise;
			},
			getGoogleUser: function(){
				var deferred = $q.defer();
				deferred.resolve(gapi.auth2.getAuthInstance().currentUser.get());
				return deferred.promise;
			},
			
			//Firebase 
			
			connectFirebaseUsers: function() {
				console.log("Checking Firebase");
				
				var authSrv = this;
				
				var isUserEqual = function (googleUser, firebaseUser) {
				  if (firebaseUser) {
					  console.log('isEqual', googleUser.getBasicProfile().getId());
				    var providerData = firebaseUser.providerData;
				    for (var i = 0; i < providerData.length; i++) {
				      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
				          providerData[i].uid === googleUser.getId()) {
				        // We don't need to reauth the Firebase connection.
				        return false;
				      }
				    }
				  }
				  return true;
				}
				
				var deferred = $q.defer();
				
				var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
				    unsubscribe();
				    // Check if we are already signed-in Firebase with the correct user.
					var googleUser = {};
					authSrv.getGoogleUser().then(function(googleUser){
						console.log(googleUser.getAuthResponse());
					    if (isUserEqual(googleUser, firebaseUser)) {
					      // Build Firebase credential with the Google ID token.
							var credential = '';
							authSrv.getToken().then(function(result) {
		  				      credential = firebase.auth.GoogleAuthProvider.credential(result);
						      firebase.auth().signInWithCredential(credential).then(function() {
									  deferred.resolve();
							  });
							});

					    } else {
							console.log('User already signed in with Firebase.');
							deferred.resolve();
					    }
					});
					return deferred.promise;
				});
			}
		}
	}]);
})();