(function(){
	'use strict';

	angular
		.module('app', ['ui.router', 'ct.ui.router.extras.sticky']);

})();
(function(){
	'use strict';

	angular
		.module('app')
		.config(['$stateProvider', '$urlRouterProvider',  '$stickyStateProvider', function($stateProvider, $urlRouterProvider,  $stickyStateProvider){
			$stateProvider
				.state('manifest', {
					url: '/manifest',
					templateUrl: 'public/app/manifest/manifest.html',
					controller: 'ManifestCtrl',
					controllerAs: 'vm',
					sticky: true,
					resolve: {
						stationCrewPrepFactory: stationCrewPrepFactory
					}
				})
				.state('crewmember', {
					url: '/crewmember/{id}',
					templateUrl: 'public/app/crewmember/crewmember.html',
					controller: 'CrewMemberCtrl',
					controllerAs: 'vm',
					resolve: {
						stationCrewPrepFactory: stationCrewPrepFactory
					}
				})
				.state('engineering', {
					url: '/engineering',
					templateUrl: 'public/app/engineering/engineering.html',
					controller: 'EngineeringCtrl',
					controllerAs: 'vm'
				});

				$urlRouterProvider.otherwise('manifest');
		}]);

		function stationCrewPrepFactory(stationCrewFactory) {
    		return stationCrewFactory.getCrew();
		}
})();

(function(){
	'use strict';

	angular
		.module('app')
		.controller('CrewMemberCtrl', CrewMemberCtrl);

		CrewMemberCtrl.$inject = ['$stateParams', 'stationCrewPrepFactory'];

		function CrewMemberCtrl($stateParams, stationCrewPrepFactory) {
			var vm = this;
			vm.crewMember = stationCrewPrepFactory.RelatedTopics[$stateParams.id];

		}
		
})();
(function(){
	'use strict';

	angular
		.module('app')
		.controller('EngineeringCtrl', EngineeringCtrl);


		function EngineeringCtrl() {


		}
		
})();
(function(){
	'use strict';

	angular
		.module('app')
		.controller('ManifestCtrl', ManifestCtrl);

		ManifestCtrl.$inject = ['stationCrewPrepFactory', 'shipCrewFactory'];

		function ManifestCtrl(stationCrewPrepFactory, shipCrewFactory) {
			var vm = this;
			vm.stationCrew = stationCrewPrepFactory.RelatedTopics;
			vm.shipCrew = shipCrewFactory;


			vm.addCrew = function(){

				for (var i = vm.stationCrew.length - 1; i >= 0; i--) {
					if (vm.stationCrew[i].selected === true) {
						vm.stationCrew[i].selected = false;
						vm.shipCrew.push(vm.stationCrew[i]);
  						vm.stationCrew.splice(i, 1);
					}
				}

			};


			vm.removeCrew = function(){

				for (var i = vm.shipCrew.length - 1; i >= 0; i--) {
					if (vm.shipCrew[i].selected === true) {
						vm.shipCrew[i].selected = false;
						vm.stationCrew.push(vm.shipCrew[i]);
  						vm.shipCrew.splice(i, 1);
					}
				}
			};

		}
		
})();
(function(){
	'use strict';

	angular
		.module('app')
		.directive('toggleSelected', toggleSelected);

		function toggleSelected() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					element.bind('click', function() {
						element.toggleClass("selected");
					});
				}
			};

		}
		
})();
(function(){
	'use strict';

	angular
		.module('app')
		.filter('customFilter', customFilter);

		function customFilter(){
			return function(item) {

				var output = "";

				for (var i=0; i < item.length; i++) {

					if (item.charAt(i) == "-" || item.charAt(i) == "(") {
						break;
					} else {
						output += item.charAt(i);
					}

				}

				return output;
			};
		}
})();

(function(){
	'use strict';

	angular
		.module('app')
		.factory('stationCrewFactory', stationCrewFactory);

		stationCrewFactory.$inject = ['$http'];


		function stationCrewFactory($http){

			return {
				getCrew: getCrew
			};

			function getCrew() {
				return $http.jsonp('http://api.duckduckgo.com/?q=star+trek+deep+space+nine+characters&format=json&pretty=1&callback=JSON_CALLBACK')
					.then(getCrewComplete)
					.catch(getCrewFailed);

				function getCrewComplete(response) {
					return response.data;
				}

				function getCrewFailed(error) {
					console.log('XHR Failed for getCrew.' + error.data);
				}

			}
			
		}

})();

(function(){
	'use strict';

	angular
		.module('app')
		.factory('shipCrewFactory', shipCrewFactory);

		function shipCrewFactory(){
			var crew = [];
			return crew;
		}

})();