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