angular.module('myApp').directive('gmailPanel', ['GApi', 'GData', function(GApi, GData) {
	
	var gmailPanelController = ['$scope', function($scope) {
		var gPanelCtrl = this;
		
		if(!GData.isLogin()){
			gPanelCtrl.isLoggedIn = false;
		}
		
		
		
	}];
	
	var gmailPanelLink = function(scope, elem, attrs) {
		
		scope.$on('userIsLogin', function(nVal, oVal) {
			scope.isLoggedIn = true;
			scope.gmailMessages = [];
			
			GApi.executeAuth('gmail', 'users.threads.list', {userId:'me', maxResults: 10}).then(function(response) {
				console.log(response);
				angular.forEach(response.threads, function(val, key) {
					
					var filteredMessage = {id:val.id, snippet: val.snippet};
					GApi.executeAuth('gmail', 'users.threads.get', {userId: 'me', id: val.id, format: 'metadata'}).then(function(result) {
						filteredMessage.date = result.messages[0].payload.headers[11];
						filteredMessage.from = result.messages[0].payload.headers[12];
						filteredMessage.subject = result.messages[0].payload.headers[15];
						scope.gmailMessages.push(filteredMessage);
					});
				});
			}, function(error) {
				console.log(error);
			});
			console.log(scope.gmailMessages);
		});
		
	}
	
	
	return {
		templateUrl: 'app/gmailPanel/gmailPanel.tpl.html',
		controller: gmailPanelController,
		controllerAs: 'gPanelCtrl',
		link: gmailPanelLink,
	}
}]);

