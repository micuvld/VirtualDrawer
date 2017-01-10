/**
 * Created by vlad on 03.11.2016.
 */
virtualDrawer.controller('MainController', ['$scope', '$http', function($scope,$http) {
	$scope.$on('editButtons', function() {
		$scope.$broadcast('editButtonsForTagController');
	})

	$scope.isItemPage = function() {
		if (window.location.href.indexOf("items") == -1) {
			return false;
		} else {
			return true;
		}
	}
}]);