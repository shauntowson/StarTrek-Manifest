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