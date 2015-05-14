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
					url: '/crewmember/:id',
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
