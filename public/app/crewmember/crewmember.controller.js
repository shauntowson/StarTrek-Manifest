(function(){
	'use strict';

	angular
		.module('app')
		.controller('CrewMemberCtrl', CrewMemberCtrl);

		CrewMemberCtrl.$inject = ['$stateParams', 'stationCrewPrepFactory'];

		function CrewMemberCtrl($stateParams, stationCrewPrepFactory) {
			var vm = this;
			vm.crewMember = stationCrewPrepFactory[$stateParams.id];

		}
		
})();