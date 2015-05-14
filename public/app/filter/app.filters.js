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
