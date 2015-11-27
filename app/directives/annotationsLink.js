angular
	.module('quickGoFeApp')
	.directive('annotationsLink', ['searchService', function(searchService) {
		return {
			restrict: 'E',
			template: '{{annotationsCount}} annotations',
			scope: {},
			link: function($scope, element, attrs, controller) {
				var termId, productId;

				attrs.$observe('termid', function() {
					termId = attrs.termid;
					searchService.findAnnotationsForTerm(termId).then(function(d){
						$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
					});
				});

				attrs.$observe('productid', function() {
					productId = attrs.productid;
					searchService.findAnnotationsForProduct(productId).then(function(d){
						$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
					});
				});
			}
		};
	}]);