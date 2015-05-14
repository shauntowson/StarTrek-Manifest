(function(){
	'use strict';

	angular
		.module('app')
		.controller('ManifestCtrl', ManifestCtrl);

		ManifestCtrl.$inject = ['stationCrewPrepFactory', 'shipCrewFactory', '$scope'];

		function ManifestCtrl(stationCrewPrepFactory, shipCrewFactory, $scope) {
			var vm = this;
			vm.stationCrew = stationCrewPrepFactory;
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